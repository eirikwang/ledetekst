package no.nav.sbl.ledeteksteditor.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.function.Predicate;
import java.util.regex.Pattern;

public class BrukerUtils {
    private static final Predicate<String> EPOST = Pattern.compile("^([a-zA-Z0-9]\\.?)+@nav\\.no$").asPredicate();

    public static boolean erAutentisert(String navn, String epost) {
        if (erBlank(navn) || erBlank(epost) || !erGyldigEpost(epost)) {
            return false;
        }
        return true;
    }

    public static boolean erGyldigEpost(String epost) {
        return EPOST.test(epost);
    }

    public static boolean erBlank(String navn) {
        return navn == null || "undefined".equals(navn) || "null".equals(navn) || StringUtils.isBlank(navn);
    }
}
