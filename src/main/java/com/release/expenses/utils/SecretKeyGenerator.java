package com.release.expenses.utils;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

@Deprecated
/* Don't Use this method.
This method is only to generate Secret key for Encryption Purposes.
 */
public class SecretKeyGenerator {
    public static String generateBase64EncodedAESKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256); // 256-bit AES key
        SecretKey secretKey = keyGen.generateKey();
        byte[] encoded = secretKey.getEncoded();
        return Base64.getEncoder().encodeToString(encoded);
    }
}
