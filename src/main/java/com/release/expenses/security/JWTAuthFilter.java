package com.release.expenses.security;

import com.release.expenses.utils.AuthUtil;
import com.release.expenses.model.User;
import com.release.expenses.repository.UserRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Slf4j
@Component
public class JWTAuthFilter extends OncePerRequestFilter {
    private final AuthUtil authUtil;
    private final UserRepo userRepo;
    private final HandlerExceptionResolver handlerExceptionResolver;

    public JWTAuthFilter(AuthUtil authUtil, UserRepo userRepo,
                         @Qualifier("handlerExceptionResolver") HandlerExceptionResolver handlerExceptionResolver) {
        this.authUtil = authUtil;
        this.userRepo = userRepo;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.debug("Incoming Request to JwtAuthFilter {}", request.getRequestURI());

            final String requestHeaders = request.getHeader("Authorization");
            if (requestHeaders == null || !requestHeaders.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }
            String token = requestHeaders.split("Bearer ")[1];
            String userId = authUtil.parseToken(token);

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                User user = userRepo.findById(Long.valueOf(userId)).orElseThrow();
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userId, null, null);
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
            filterChain.doFilter(request, response);
        } catch (Exception ex){
            handlerExceptionResolver.resolveException(request,response,null,ex);
        }
    }
}
