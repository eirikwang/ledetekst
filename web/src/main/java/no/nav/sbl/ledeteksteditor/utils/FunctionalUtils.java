package no.nav.sbl.ledeteksteditor.utils;

import java.util.function.Predicate;

public class FunctionalUtils {
    public static <T> Predicate<T> not(Predicate<T> predicate) {
        return predicate.negate();
    }
}
