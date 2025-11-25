package com.release.expenses.service;

import com.release.expenses.dto.UserResponseDTO;
import com.release.expenses.exception.UserNotFoundException;
import com.release.expenses.model.User;
import com.release.expenses.repository.UserRepo;
import com.release.expenses.utils.AuthUserUtil;
import com.release.expenses.utils.EncryptionUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final AuthUserUtil authUserUtil;

    @Transactional
    public User createUser(String phoneHash){
        if(userRepo.existsByPhoneHash(phoneHash)){
            log.debug("Existing User");
            return userRepo.findByPhoneHash(phoneHash);
        }
        User user = new User();
        user.setPhoneHash(phoneHash);
        return userRepo.save(user);
    }

    @Transactional
    public User updateUser(Long Id, String token){
        User user = userRepo.findById(Id).orElseThrow(()->new UserNotFoundException("User not Found!"));
        user.setRefreshToken(token);
        return userRepo.save(user);
    }

    public Optional<User> findUserById(Long Id){
        return userRepo.findById(Id);
    }

    public UserResponseDTO getUserDetails() throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        Long userId = authUserUtil.getCurrentUser();
        User user = findUserById(userId).orElseThrow(()-> new UserNotFoundException("User Not Found!"));
        String phoneNumber = EncryptionUtil.decrypt(user.getPhoneHash());
        return new UserResponseDTO(user.getName(), null, phoneNumber);
    }
}
