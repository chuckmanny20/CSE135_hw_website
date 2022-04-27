<%@ page import="java.util.*" %>
<%
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Content-type", "text/html");
%>

<!DOCTYPE html>
<html>
    <head>
        <title>Hello, JSP!</title>
    </head>
    <body>
        <%
            out.print("<h1>Liam was here - Hello, JSP!</h1>");
            out.print("<p>This page was generated with the JSP scripting langauge</p>");
            
            out.print("<p>Current UTC Time:" + (new java.util.Date()).toLocaleString() + "</p>";
            
            out.print("<p>Your IP Address:" + request.getRemoteAddr() +"</p>";
        %>
    </body>
</html>