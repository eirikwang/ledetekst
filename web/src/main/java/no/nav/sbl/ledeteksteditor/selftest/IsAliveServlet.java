package no.nav.sbl.ledeteksteditor.selftest;


import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class IsAliveServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().write("{status : \"ok\", message: \"ledeteksteditor fungerer\"}");
    }
}
