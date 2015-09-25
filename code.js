//创建者:杨泉耀 版本:1.0 Bate 证书:MIT
//
function Format(code) {
    return code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Decode(code)
{
    return code.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
}
function GetZero(n)
{
    if(n<=1)
        return "0";
    else
        return "0"+GetZero(n-1);
}
function FormatNumber(m,n)
{
    if ((m + "").length < n)
        return GetZero(n - (m + "").length)+m;
    return m + "";
}
//-- C#
function Operate_CSharp(str) {
    var keys = /\+|\||\-|=|\*|\?|&amp;|&lt;|&gt;|\^|\%/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_CSharp(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/\/\*/g);
        var right = code[i].match(/\*\//g)

        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' +FormatNumber(i + 1,3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_CSharp(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class{l}{q}Comments{q}>$&</code>');

    return result;
}
function FinalCheck_CSharp(code) {
    return code.replace(/{q}/g, "\"").replace(/{l}/g, "=").replace(/{j}/g, "-").replace(/{s}/g, "String");
}
function GetString_CSharp(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class{l}"{s}">$&</code>');
}
function KeyWord_CSharp(str) {
    var result = str;
    result = result.replace(/(\s+(var|abstract|as|base|bool|break|byte|case|catch|char|Checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|Object|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|static|stackalloc|string|struct|switch|try|this|uint|ulong|Unchecked|unsafe|ushort|using|virtual|void|volatile|while)\s+)|(\s+[a-zA-z]*[0-9]*(\s+|\[[0-9]*\]\s+))|(^<[a-zA-z0-9]+(\[\])*\s+)|(\s+(if|try))|(static|void|bool|int|double|float|string|long|short|(class\s+))/g, '<code class="KeyWord">$&</code>');
    return result;
}
function CSharp(code) {
    code = Format(code);
    code = Comments_CSharp(code);
    code = GetString_CSharp(code);
    var lines = code.split("\n");
    code = LineNumber_CSharp(lines);
    code = Operate_CSharp(code);
    //console.log(code);
    code = KeyWord_CSharp(code);
    code = FinalCheck_CSharp(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">C#</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</div></div>' + code;
}

//--Java
function Operate_Java(str) {
    var keys = /\+|\||\-|=|\*|\?|&amp;|&lt;|&gt;|\^|\%/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_Java(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/\/\*/g);
        var right = code[i].match(/\*\//g)

        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_Java(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class{l}{q}Comments{q}>$&</code>');

    return result;
}
function FinalCheck_Java(code) {
    return code.replace(/{q}/g, "\"").replace(/{l}/g, "=").replace(/{j}/g, "-").replace(/{s}/g, "String");
}
function GetString_Java(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class{l}"{s}">$&</code>');
}
function KeyWord_Java(str) {
    var result = str;
    result = result.replace(/(\s+(abstract|as|base|bool|break|byte|case|catch|char|Checked|class|const|continue|decimal|default|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|boolean|extends|new|null|Object|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|static|stackalloc|String|struct|switch|this|uint|ulong|Unchecked|unsafe|ushort|using|virtual|void|volatile|while|final|finally|implements|import|instanceof|native|packge|super|synchronized|transient)\s+)|(\s+[a-zA-z]*[0-9]*(\s+|\[[0-9]*\]\s+))|(\s*(void|class|static|const)\s+)|(\s+(if))|(final|new|String|int|double|float|boolean)/g, '<code class="KeyWord">$&</code>');
    return result;
}
function Java(code) {
    code = Format(code);
    code = Comments_Java(code);
    code = GetString_Java(code);
    var lines = code.split("\n");
    code = LineNumber_Java(lines);
    code = Operate_Java(code);
    code = KeyWord_Java(code);
    code = FinalCheck_Java(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">Java</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}

//-- C/C++

function Operate_CPlusPlus(str) {
    var keys = /\+|\||\-|=|\*|\?|&amp;|&lt;|&gt;|\^|\%/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_CPlusPlus(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/\/\*/g);
        var right = code[i].match(/\*\//g)

        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line{j}Body"><div><code class="PCode"> ' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_CPlusPlus(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class{l}{q}Comments{q}>$&</code>');

    return result;
}
function FinalCheck_CPlusPlus(code) {
    return code.replace(/{q}/g, "\"").replace(/{l}/g, "=").replace(/{j}/g,"-");
}
function GetString_CPlusPlus(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class{l}"String">$&</code>');
}
function KeyWord_CPlusPlus(str) {
    var result = str;
    result = result.replace(/(\s+(int|float|void|double|char|string|uint|uin32|uint8|uint16|uint64|int32|int64|auto|double|struct|break|long|switch|case|enum|register|typedef|extern|union|return|const|short|unsigned|continue|for|singend|void|default|goto|sizeof|volatile|static|asm|inline|typeid|bool|dynamic_cast|typename|mutable|catch|explicit|namespace|static_cast|using|export|new|virtual|false|true|template|volatile|public|private|this|wchar_t|throw|friend|delete|reinterpret_cast|try|alignas|alignof|char16_t|char32_t|constexpr|decltype|noexcept|nullptr|null|static_assert|NULL|class)\s+)|(\s*if)|(\s*else)|(\s*(cout|cin|while))|(\s*do(\s+|\{))|(\s*#(include|define|undef|if|elif|ifdef|ifndef|endif|error|else|line|pragma))|(\s+[a-zA-z]*[0-9]*(\s+|\[[0-9]*\]\s+))/g, '<code class="KeyWord">$&</code>');
   

    return result;
}
function CPlusPlus(code) {
    code=Format(code);
    code = Comments_CPlusPlus(code);
    code = GetString_CPlusPlus(code);
    var lines = code.split("\n");
    code = LineNumber_CPlusPlus(lines);
    code = Operate_CPlusPlus(code);
    code = KeyWord_CPlusPlus(code);
    code = FinalCheck_CPlusPlus(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">C/C++</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}


//-- JavaScript
function Operate_JavaScript(str) {
    var keys = /\+|\||\-|=|\*|\?|&amp;|&lt;|&gt;|\^|\%/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_JavaScript(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/\/\*/g);
        var right = code[i].match(/\*\//g)

        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_JavaScript(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class{l}{q}Comments{q}>$&</code>');

    return result;
}
function FinalCheck_JavaScript(code) {
    return code.replace(/{q}/g, "\"").replace(/{l}/g, "=").replace(/{j}/g, "-");
}
function GetString_JavaScript(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class{l}"String">$&</code>');
}
function KeyWord_JavaScript(str) {
    var result = str;
    result = result.replace(/(\s+(var|function|abstract|as|base|bool|break|byte|case|catch|char|Checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|Object|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|static|stackalloc|string|struct|switch|this|uint|ulong|Unchecked|unsafe|ushort|using|virtual|void|volatile|while)\s+)|(\s+[a-zA-z]*[0-9]*(\s+|\[[0-9]*\]\s+))|(\s*(void|class|static|const)\s+)|(\s+(if))/g, '<code class="KeyWord">$&</code>');
    return result;
}
function JavaScript(code) {
    code = Format(code);
    code = Comments_CSharp(code);
    code = GetString_CSharp(code);
    var lines = code.split("\n");
    code = LineNumber_CSharp(lines);
    code = Operate_CSharp(code);
    code = KeyWord_CSharp(code);
    code = FinalCheck_CSharp(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">JavaScript</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}


//-- HTML/XML
function Operate_HTMLXML(str) {
    var keys = /\+|\||\-|=/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_HTMLXML(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/&lt;\!--/g);
        var right = code[i].match(/--&gt;/g)
        
        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments">' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments">' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments">' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="PCode">' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments">' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="PCode">' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_HTMLXML(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class="Comments">$&</code>');

    return result;
}
function FinalCheck_HTMLXML(code) {
    return code.replace(/{q}/g, "\"");
}
function GetString_HTMLXML(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class="String">$&</code>');
}
function Tag(code) {

   // console.log(code.match(/&lt;[a-zA-Z0-9]*|&lt;\/[a-zA-Z0-9]*&gt;/g));
    return code.replace(/(&lt;[a-zA-Z0-9]+)|(&lt;\/[a-zA-Z0-9]*&gt;)/g, '<code class={q}Tag{q}>$&</code>');
    //return code;
}
function KeyWord_HTMLXML(str) {
    //([^\s=]+)=(['"\s]?)([^'"]+)\2(?=\s|$|>|'$|"$)
    //console.log(str.match(/([^\s=]+)=(['"\s]?)([^'"]+)\2/g));
    result = str.replace(/([^\s=]+)=(['"\s]?)([^'"]+)\2/g, '<code class={q}KeyWord{q}>$&</code>');


    return result;
}
function HTMLXML(code) {
    code = Format(code);
    code = KeyWord_HTMLXML(code);
    code = Tag(code);
    code = GetString_HTMLXML(code);
    
    var lines = code.split("\n");
    //console.log(lines);

    code = LineNumber_HTMLXML(lines);
    //code = Comments_HTMLXML(code);

    code = FinalCheck_HTMLXML(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">HTML/XML</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}

//-- CSS
function Operate_CSS(str) {
    var keys = /\+|\||\-|=/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_CSS(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/&lt;\!--/g);
        var right = code[i].match(/--&gt;/g)

        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="PCode"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="Comments"> ' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="PCode"> ' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_CSS(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class="Comments">$&</code>');

    return result;
}
function FinalCheck_CSS(code) {
    return code.replace(/{q}/g, "\"");
}
function GetString_CSS(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class="String">$&</code>');
}
function Attrbutes_CSS(code) {

    // console.log(code.match(/&lt;[a-zA-Z0-9]*|&lt;\/[a-zA-Z0-9]*&gt;/g));
    return code.replace(/\s+[-a-zA-Z0-9]*\-*[a-zA-Z0-9]*:/g, '<code class={q}Tag{q}>$&</code>');
    //return code;
}
function Values_CSS(code) {

    // console.log(code.match(/&lt;[a-zA-Z0-9]*|&lt;\/[a-zA-Z0-9]*&gt;/g));
    return code.replace(/(\s?[-#a-zA-Z0-9]*){0,5};/g, '<code class={q}Value{q}>$&</code>');
    //return code;
}
function KeyWord_CSS(str) {
    //([^\s=]+)=(['"\s]?)([^'"]+)\2(?=\s|$|>|'$|"$)
    //console.log(str.match(/([^\s=]+)=(['"\s]?)([^'"]+)\2/g));
    result = str.replace(/\s+(\.|\#)?[a-zA-Z]*[0-9]*\-*[a-zA-Z]*[0-9]*\s*\{/g, '<code class={q}KeyWord{q}>$&</code>');


    return result;
}
function CSS(code) {
    code = Format(code);
    code = GetString_CSS(code);
    code = Comments_CSS(code);
    var lines = code.split("\n");
    
    code = LineNumber_CSS(lines);
    
    code = KeyWord_CSS(code);
    code = Attrbutes_CSS(code);
    
    code = Values_CSS(code);

    
    //console.log(lines);
    
    
    

    code = FinalCheck_CSS(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">CSS/SASS/LESS</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}

//-- PHP
function Operate_PHP(str) {
    var keys = /\+|\||\-|=|\*|\?|&amp;|&lt;|&gt;|\^|\%/g;
    var result = str;
    result = result.replace(keys, '<code class={q}Operate{q}>$&</code>');
    return result;
}
function LineNumber_PHP(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        var left = code[i].match(/\/\*/g);
        var right = code[i].match(/\*\//g)

        if (right != null && left != null) {
            if (left.length > right.length) {

                f = true;

            }
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (left != null) {
            f = true;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right != null) {
            f = false;
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';
        }
        else if (right == null && left == null && !f) {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';

        }
        else if (f) {


            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"Comments"> ' + code[i] + '</code></div></td></tr>';


        }

        else {
            result += '<tr class{l}"Line">' + '<td class{l}"LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class{l}"Line{j}Body"><div><code class{l}"PCode"> ' + code[i] + '</code></div></td></tr>';
        }
        //console.log(code[i].match(/\/\*/g).length);

    }
    return result + "</tbody></table>";
}
function Comments_PHP(code) {
    var reg = /((\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))/g;
    var str = "(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)";
    //var reg = '([^(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')](\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/))';
    var result = code;
    //console.log(code.match(reg));
    result = result.replace(new RegExp(str, "g"), '<code class{l}{q}Comments{q}>$&</code>');

    return result;
}
function FinalCheck_PHP(code) {
    return code.replace(/{q}/g, "\"").replace(/{l}/g, "=").replace(/{j}/g, "-");
}
function GetString_PHP(code) {
    // var reg = /(\"([^\\\"]*(\\.)?)*\")|(\'([^\\\']*(\\.)?)*\')/g
    var reg = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g;
    // console.log(code.match(reg));
    return code.replace(reg, '<code class{l}"String">$&</code>');
}
function KeyWord_PHP(str) {
    var result = str;
    result = result.replace(/(\s+(var|function|abstract|as|base|break|byte|case|catch|Checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|Object|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|static|stackalloc|string|struct|switch|this|uint|ulong|Unchecked|unsafe|ushort|using|virtual|void|volatile|while)\s+)|(\s+[a-zA-z]*[0-9]*(\s+|\[[0-9]*\]\s+))|(\s*(void|class|static|const)\s+)|(\s+(if))/g, '<code class="KeyWord">$&</code>');
    return result;
}
function Var(code)
{
    return code.replace(/\$[a-zA-Z]*[0-9]*/g, '<code class="Var">$&</code>');
}
function PHP(code) {
    code = Format(code);
    code = Comments_CSharp(code);
    code = GetString_CSharp(code);
    var lines = code.split("\n");
    code = LineNumber_CSharp(lines);
    //alert(code);
    code = Operate_CSharp(code);
    code = KeyWord_CSharp(code);
    code = Var(code);
    code = FinalCheck_CSharp(code);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">PHP</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}


//-- Aother
function LineNumber(code) {
    var result = "";
    result += "<table><tbody>"
    var f = false;
    for (var i = 0; i < code.length-1; i++) {
        result += '<tr class="Line">' + '<td class="LineNumber">' + FormatNumber(i + 1, 3) + '</td><td class="Line-Body"><div><code class="PCode">' + code[i] + '</code></div></td></tr>';
    }
    return result + "</tbody></table>";
}
function AotherLange(code) {
    code = Format(code);
    var lines = code.split("\n");
    var code = LineNumber(lines);
    return '<div class="CodeToolBar"><div class="toolitem"><a href="javascript:;">其它</a></div><div class="toolitem"><a href="javascript:;" class="copy">复制</a></div></div>' + code;
}


function Responsive() {
    $("pre").each(function () {
        //$(this).find("table").css("width", $(this).find("table").width());
        $(this).find(".CodeToolBar").css("width", $(this).find("table").width());
        if ($(this).find("table").width() < $(this).width())
            $(this).find(".CodeToolBar").css("width", "100%");
        if ($(window).width() < 768) {
            $(this).find("table").css("font-size", 10);
            // $(this).find("table").css("transform", "scale(0.5)");
            // $(this).find("table").css("height", $(this).attr("data-realHeight") / 2);
            //  $(this).css("height", $(this).attr("data-realHeight") / 2);
        }
        else {
            //  $(this).find("table").css("transform", "scale(1)");
            //  $(this).find("table").css("height", "auto");
            //  $(this).css("height", "auto");
            $(this).find("table").css("font-size", 14);
        }
    });
}
function Move(id) {
    var $ = function (flag) {
        return document.getElementById(flag);
    }
    $(id).onmousedown = function (e) {
        var d = document;
        var that = this;
        var page = {
            event: function (evt) {
                var ev = evt || window.event;
                return ev;
            },
            pageX: function (evt) {
                var e = this.event(evt);
                return e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);
            },
            pageY: function (evt) {
                var e = this.event(evt);
                return e.pageY || (e.clientY + document.body.scrollTop - document.body.clientTop);

            },
            layerX: function (evt) {
                var e = this.event(evt);
                return e.layerX || e.offsetX;
            },
            layerY: function (evt) {
                var e = this.event(evt);
                return e.layerY || e.offsetY;
            }
        }
        var x = page.layerX(e);
        var y = page.layerY(e);
        if (that.setCapture) {
            that.setCapture();
        }
        else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        d.onmousemove = function (e) {
            var tx = page.pageX(e) - x;
            var ty = page.pageY(e) - y;
            that.style.left = tx + "px";
            that.style.top = ty + "px";
        }
        d.onmouseup = function () {
            if (that.releaseCapture) {
                that.releaseCapture();
            }
            else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            d.onmousemove = null;
            d.onmouseup = null;
        }
    }
}

    $("body").ready(function () {
    
       
        $("pre").each(function () {
            $(this).addClass("pre");
            var code = $(this).html();
            $(this).attr("data-Source", code);

            if (($(this).attr("data-lang")+"").toLowerCase() == "CSharp".toLowerCase()) {
                code = CSharp(code);
                $(this).addClass("CSharp-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "Java".toLowerCase()) {
                code = Java(code);
                $(this).addClass("Java-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "JavaScript".toLowerCase()) {
                code = JavaScript(code);
                $(this).addClass("JavaScript-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "CSS".toLowerCase()) {
                code = CSS(code);
                $(this).addClass("CSS-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "PHP".toLowerCase()) {
                code = PHP(code);
                $(this).addClass("PHP-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "C/C++".toLowerCase()) {
                code = CPlusPlus(code);
                $(this).addClass("CPlusPlus-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "HTML/XML".toLowerCase()) {
                code = HTMLXML(code);
                $(this).addClass("HTML-Code");
            }
            else
                code = AotherLange(code);
            $(this).html(code);
            //$(this).html(code);
            $(this).attr("data-realHeight", $(this).height());
            Responsive();
        });
        $(".copy").click(function () {
            

            var box = document.createElement("div");
            box.id = "msg";
            $(box).addClass("Messagebox");
            var head = document.createElement("div");
            head.id = "mhead";
            $(head).addClass("box-head");
            var title = document.createElement("span");
            $(title).text("复制代码");
            head.appendChild(title);
            var body = document.createElement("div");
            $(body).addClass("box-body");
            var content = document.createElement("textarea");
            $(content).attr('id',"content");
            //alert($($($($(this).parent()).parent()).parent()).attr("class"));
            $(content).val(Decode($($($($(this).parent()).parent()).parent()).attr("data-Source")));
            content.select();
            body.appendChild(content);
            var footer = document.createElement("div");
            $(footer).addClass("box-footer");
            var buuton = document.createElement("button");
            $(buuton).addClass("button-close");
            $(buuton).text("Close");
            var sc = document.createElement("script");
            //$(sc).html('Move("msg");$(".box-head").mousedown(function (event) {console.log($(window).width() + "," + $(window).height() + "\n" + event.clientX + "," + event.clientY);console.log(event.offsetX);$($(this).parent()).addClass("move");});$(".box-head").mouseup(function (event) {$($(this).parent()).removeClass("move");});$(".button-Close").click(function () { var doc = $("body")[0]; doc.removeChild($(".Messagebox")[0]); });');
            footer.appendChild(buuton);
            footer.appendChild(sc);
            box.appendChild(head);
            box.appendChild(body);
            box.appendChild(footer);
            var doc = $("body")[0];
            doc.appendChild(box);
            //Move("msg");
            $(".box-head").mousedown(function (event) {

                $($(this).parent()).addClass("move");
            });
            $(".box-head").mouseup(function (event) {
                $($(this).parent()).removeClass("move");
            });
            $(".button-close").click(function () { var doc = $("body")[0]; doc.removeChild($(".Messagebox")[0]); });
            $("#content").mousedown(function(){

              //  return false;
            });

        });
        if(window.addEventListener)
        {
            window.addEventListener('resize',Responsive());
        }
        else
        {
            window.attachEvent('resize',Responsive());

        }

    });

    
    function CodeParse() {

        $("pre").each(function () {

            $(this).addClass("pre");
            var code = $(this).html();
            $(this).attr("data-Source", code);

            if (($(this).attr("data-lang")+"").toLowerCase() == "CSharp".toLowerCase()) {
                code = CSharp(code);
                $(this).addClass("CSharp-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "Java".toLowerCase()) {
                code = Java(code);
                $(this).addClass("Java-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "JavaScript".toLowerCase()) {
                code = JavaScript(code);
                $(this).addClass("JavaScript-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "CSS".toLowerCase()) {
                code = CSS(code);
                $(this).addClass("CSS-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "PHP".toLowerCase()) {
                code = PHP(code);
                $(this).addClass("PHP-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "C/C++".toLowerCase()) {
                code = CPlusPlus(code);
                $(this).addClass("CPlusPlus-Code");
            }
            else if (($(this).attr("data-lang")+"").toLowerCase() == "HTML/XML".toLowerCase()) {
                code = HTMLXML(code);
                $(this).addClass("HTML-Code");
            }
            else
                code = AotherLange(code);
            $(this).html(code);
            //$(this).html(code);
            $(this).attr("data-realHeight", $(this).height());
            Responsive();
        });
        $(".copy").click(function () {


            var box = document.createElement("div");
            box.id = "msg";
            $(box).addClass("Messagebox");
            var head = document.createElement("div");
            head.id = "mhead";
            $(head).addClass("box-head");
            var title = document.createElement("span");
            $(title).text("复制代码");
            head.appendChild(title);
            var body = document.createElement("div");
            $(body).addClass("box-body");
            var content = document.createElement("textarea");
            //alert($($($($(this).parent()).parent()).parent()).attr("class"));

            $(content).attr('id',"content");
            $(content).val(Decode($($($($(this).parent()).parent()).parent()).attr("data-Source"))); content.select();
            body.appendChild(content);
            var footer = document.createElement("div");
            $(footer).addClass("box-footer");
            var buuton = document.createElement("button");
            $(buuton).addClass("button-close");
            $(buuton).text("Close");
            var sc = document.createElement("script");
           // $(sc).html('Move("msg");$(".box-head").mousedown(function (event) {console.log($(window).width() + "," + $(window).height() + "\n" + event.clientX + "," + event.clientY);console.log(event.offsetX);$($(this).parent()).addClass("move");});$(".box-head").mouseup(function (event) {$($(this).parent()).removeClass("move");});$(".button-Close").click(function () { var doc = $("body")[0]; doc.removeChild($(".Messagebox")[0]); });');
            footer.appendChild(buuton);
            footer.appendChild(sc);
            box.appendChild(head);
            box.appendChild(body);
            box.appendChild(footer);
            var doc = $("body")[0];
            doc.appendChild(box);
            //Move("msg");
            $("#content").mousedown(function(){
                $(this).focus();
                //return false;
            });
            $(".box-head").mousedown(function (event) {
                console.log($(window).width() + "," + $(window).height() + "\n" + event.clientX + "," + event.clientY);
                console.log(event.offsetX);
                $($(this).parent()).addClass("move");
            });
            $(".box-head").mouseup(function (event) {
                $($(this).parent()).removeClass("move");
            });
            $(".button-close").click(function () { var doc = $("body")[0]; doc.removeChild($(".Messagebox")[0]); });
           // content.select();
        });
    }