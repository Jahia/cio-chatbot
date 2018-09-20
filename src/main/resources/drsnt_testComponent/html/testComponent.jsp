<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>

<c:set var="targetId" value="reactComponentBrandsBanner${fn:replace(currentNode.identifier,'-','_')}"/>

<template:addResources type="javascript" resources="apps/vendors-chatbot.js" />
<template:addResources type="javascript" resources="apps/testComponent.js" />
<template:addResources type="css" resources="all.css" />
<template:addResources type="css" resources="cioProductbot.css" />
<template:addResources type="css" resources="watson-react-components.min.css" />

<div id="${targetId}">loading..</div>

<script>
    var contextJsParameters = {
        prop1: "my prop",
        servletContext: "${url.context}"
    };

    <c:choose>
    <c:when test="${renderContext.editMode}" >
    setTimeout(function() {
        <%--testComponentReactRender('${targetId}', "${currentNode.identifier}", contextJsParameters);--%>
        productBotComponentReactRender('${targetId}', "${currentNode.identifier}", contextJsParameters);
    }, 1000);
    </c:when>
    <c:otherwise>
    <%--testComponentReactRender('${targetId}', "${currentNode.identifier}", contextJsParameters);--%>
    productBotComponentReactRender('${targetId}', "${currentNode.identifier}", contextJsParameters);
    </c:otherwise>
    </c:choose>
</script>