
try{
var dvv=document.getElementById('education');
var sec=dvv.parentElement;

var jsn={}

var liTags=sec.getElementsByTagName('li');

console.log("Linkedin Manger JSON data scrapper")
console.log("------------------------")
var i=1
for (let lit of liTags)
{
    var laTag=lit.getElementsByClassName("visually-hidden")
    if (laTag.length>1){
        var ar=[]
        for (let t of laTag )
        {
            let rgx=/logo$/i;
            if (!(rgx.test(t.textContent))){
            ar.push(t.textContent);
            console.log(t.textContent);}
        }
    jsn[i++]=ar;
    console.log("")}
}
console.log(`json >`, jsn)
}
catch(err){
    console.log('No education details present')
    
}



