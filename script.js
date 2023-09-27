//?auth=testdomain.com,auth.desmos,https

function Gup (ParamName) {
    ParamName = RegExp ('[?&]' + ParamName.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
    return (window.location.href.match (ParamName) || ['', ''])[1];
}

function CreateElement(Type, Parent) {
    let Element = $( `<${Type}></${Type}>` );
    if (Parent != undefined) {
        Parent.append(Element);
    }
    
    return Element;
}

let AuthTemplate = {
    0: "DomainUrl",
    1: "CallbackPath",
    2: "Protocol",
}

let Auth = {}

let RequestAuth = Gup("auth");

import('https://code.jquery.com/jquery-3.6.4.min.js').then( () => {
    console.log(RequestAuth)
    if (RequestAuth == undefined || RequestAuth == "") { return; }
    
    let AuthParams = RequestAuth.split(",");
    AuthParams.forEach((Param, Index) => {
        Auth[ AuthTemplate[Index] ] = Param;
    })

    let AuthDomainArray = Auth.DomainUrl.split(".");
    AuthDomainArray.pop();
    Auth.SuffixlessDomainName = AuthDomainArray.join(".");

    Auth.FullDomain = `${Auth.Protocol}://${Auth.DomainUrl}`;

    console.log(Auth);

    let Permissions = [
        "Email Address",
        "Full Name",
        "User Identification",
        "Verification Status",
        "Teaching Employment",
        "Saved Graph Data",
        "Desmos Userscripts",
    ];

    let Body = $( document.body );
    Body.css("overflow", "hidden");
    
    let MainContainer = $( "#main-container" );
    MainContainer.css("filter", "blur(5px)");

    let AuthContainer = CreateElement("div", Body);
    AuthContainer.css("position", "absolute");
    AuthContainer.css("width", "25vw")
    AuthContainer.css("height", "80vh")
    AuthContainer.css("top", "10vh");
    AuthContainer.css("left", "37.5vw");
    AuthContainer.css("border", "1vh solid transparent");
    AuthContainer.css("border-image", "linear-gradient(120deg, rgb(80, 150, 90) 0%, rgb(105, 150, 105) 35%, rgb(150, 200, 150) 65%)");
    AuthContainer.css("border-image-slice", "1");
    AuthContainer.css("background-color", "rgb(222, 222, 222)");
    AuthContainer.css("font-family", "HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif");

    let Topbar = CreateElement("div", AuthContainer);
    Topbar.css("position", "relative");
    Topbar.css("width", "100%");
    Topbar.css("height", "20vh");
    Topbar.css("top", "0px");
    Topbar.css("left", "0px");
    Topbar.css("background-color", "rgb(200, 200, 200)");
    
    let TitleText = CreateElement("div", Topbar);
    TitleText.css("position", "relative");
    TitleText.css("width", "100%");
    TitleText.css("font-size", "5vh");
    TitleText.css("line-height", "5vh");
    TitleText.css("top", "15vh");
    TitleText.css("text-align", "center");
    TitleText.html("Desmos Auth");

    let AuthLogo = CreateElement("img", Topbar);
    AuthLogo.css("position", "relative");
    AuthLogo.css("width", "7vw");
    AuthLogo.css("height", "7vw");
    AuthLogo.css("left", "9vw");
    AuthLogo.css("bottom", "4vh");
    AuthLogo.css("border-radius", "1vh");
    AuthLogo.attr("src", "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/7ecfcfba-860b-4899-9b64-83a75e6a4377.png?auto=format&ixlib=react-9.0.3&w=380");
    
    let InfoText = CreateElement("div", AuthContainer);
    InfoText.css("position", "absolute");
    InfoText.css("width", "100%");
    InfoText.css("top", "20vh");
    InfoText.css("font-size", "3vh");
    InfoText.css("line-height", "3vh");
    InfoText.css("text-align", "center");
    InfoText.html(`Would you like <a href=${Auth.FullDomain}>${Auth.SuffixlessDomainName}</a><br> to have your...`);
    InfoText.css("font-weight", "500");

    let PermissionsText = CreateElement("ul", AuthContainer);
    PermissionsText.css("position", "absolute");
    PermissionsText.css("width", "100%");
    PermissionsText.css("height", "50vh");
    PermissionsText.css("top", "24vh");
    PermissionsText.css("font-size", "2.5vh");
    PermissionsText.css("line-height", "3vh");
    PermissionsText.css("font-weight", "lighter");

    Permissions.forEach( Permission => {
        let PermissionText = CreateElement("li", PermissionsText);
        PermissionText.html(Permission);
    })

    let AcceptButton = CreateElement("div", AuthContainer);
    AcceptButton.css("position", "absolute");
    AcceptButton.css("width", "30%");
    AcceptButton.css("height", "7vh");
    AcceptButton.css("top", "85%");
    AcceptButton.css("right", "5%");
    AcceptButton.css("background-color", "rgb(0, 100, 170)");
    AcceptButton.css("border", "2px solid black");
    AcceptButton.css("border-radius", "1vh");
    AcceptButton.css("font-size", "3vh");
    AcceptButton.css("line-height", "7vh");
    AcceptButton.css("text-align", "center");
    AcceptButton.css("color", "rgb(250, 250, 250)");
    AcceptButton.html("Accept");

    AcceptButton.click( () => {
        window.location.href = `${Auth.FullDomain}/${Auth.CallbackPath.split(".").join("/")}/?${JSON.stringify(Body[0].attributes[0].value)}`;
    });

    let CancelButton = CreateElement("div", AuthContainer);
    CancelButton.css("position", "absolute");
    CancelButton.css("width", "30%");
    CancelButton.css("height", "7vh");
    CancelButton.css("top", "85%");
    CancelButton.css("left", "5%");
    CancelButton.css("background-color", "rgb(170, 170, 170)");
    CancelButton.css("border", "2px solid black");
    CancelButton.css("border-radius", "1vh");
    CancelButton.css("font-size", "3vh");
    CancelButton.css("line-height", "7vh");
    CancelButton.css("text-align", "center");
    CancelButton.css("color", "rgb(250, 250, 250)");
    CancelButton.html("Cancel");
})
