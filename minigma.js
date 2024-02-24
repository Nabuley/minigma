class Minigma{
    constructor(complexity){
        this.complexity=complexity;
    }
    makeStrList(){
        let strList=[];
        for(let i="A".charCodeAt(0);i<="Z".charCodeAt(0);i++){
            strList.push(String.fromCharCode(i));
        }
        for(let i="a".charCodeAt(0);i<="z".charCodeAt(0);i++){
            strList.push(String.fromCharCode(i));
        }
        for(let i of " 1234567890`~!@#$%^&*(-)_=+,.?;|:'\"\\[]{}/<>"){
            strList.push(i);
        }
        strList.push("\n");
        return strList;
    }
    makeStrDict(){
        let strDict={};
        var idx=0;
        for(let i="A".charCodeAt(0);i<="Z".charCodeAt(0);i++){
            strDict[String.fromCharCode(i)]=idx;
            idx++;
        }
        for(let i="a".charCodeAt(0);i<="z".charCodeAt(0);i++){
            strDict[String.fromCharCode(i)]=idx;
            idx++;
        }
        for(let i of " 1234567890`~!@#$%^&*(-)_=+,.?;|:'\"\\[]{}/<>"){
            strDict[i]=idx;
            idx++
        }
        strDict["\n"]=idx;
        return strDict;
    }
    shuffleList(list,shuffleNum){
        let List=list.slice();
        for(let i=0;i<shuffleNum;i++){
            List.push(List.shift());
        }
        return List;
    }
    makeCiphertext(mess,shuffleNum=1){
        console.log(mess);
        shuffleNum=shuffleNum%(40+52+1+1+1+1);
        const oldList=this.makeStrDict();
        let newList=this.makeStrList();
        let res="";
        for(let text of mess){
            newList=this.shuffleList(newList,shuffleNum);
            res+=newList[oldList[text]];
        }
        return res;
    }
    solveCiphertext(mess,shuffleNum=1){
        shuffleNum=(40+52+1+1+1+1)-shuffleNum%(40+52+1+1+1+1);
        const oldList=this.makeStrDict();
        let newList=this.makeStrList();
        let res="";
        for(let text of mess){
            newList=this.shuffleList(newList,shuffleNum);
            res+=newList[oldList[text]];
        }
        return res;
    }
    encryptText() {
        const message = document.getElementById('encrypt').value;
        const complexity = document.getElementById('encryptComplexity').value;
        const result = this.makeCiphertext(message, complexity);
        document.getElementById('encryptResult').innerText = result;
    }
    decryptText() {
        const message = document.getElementById('decrypt').value;
        const complexity = document.getElementById('decryptComplexity').value;
        const result = this.solveCiphertext(message, complexity);
        document.getElementById('decryptResult').textContent = result;
    }
}
var minigma=new Minigma(0);
function encryptText() {
    minigma.encryptText();
}
function decryptText() {
    minigma.decryptText();
}