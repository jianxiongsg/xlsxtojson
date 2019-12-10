#!/usr/bin/env node
let xlsx = require('xlsx');
let fs = require('fs');
exports.convertJson = function(src){
    let datas = xlsx.readFile(src);
    let th = getTowerHpList(datas.Sheets[datas.SheetNames[0]])
    let m = getMList(datas.Sheets[datas.SheetNames[1]])
    return {
        t:th.tower,
        h:th.hp,
        m:m
    }
}

exports.convertAndWrite = function(src,toFolder){
    let datas = convertJson(src);
    let str = "window.gameData("+JSON.stringify(datas)+")";
    fs.writeFile(toFolder,str,(err,data)=>{
        if(err){
            console.log('err',err)
            return;
        }
    })
}




function getTowerHpList(datas){
    let tower = {
        s:[],
        r:[],
        d:[],
        l:[],
    };
    let hp = [];
    let mt = ['R','S','T','U','V','W'];
    for(let i=0;i<mt.length;++i){
        tower.s.push(datas[mt[i]+10].v);
        tower.r.push(datas[mt[i]+11].v);
        tower.d.push(datas[mt[i]+12].v);
        tower.l.push(datas[mt[i]+13].v);
        hp.push(datas[mt[i]+6].v);
    }
    return {
        tower:tower,
        hp:hp
    }
}

function getMList(datas){
    let mt = ['C','D','E','F','G','H'];
    let st = 2;
    let m = [];
    while(datas[mt[0]+st]){
        let items = [];
        for(let i=0;i<mt.length;++i){
            let d = datas[mt[i]+st].v;
            if(d){
                items.push(i);
                items.push(d);
            }
        }
        m.push(items);
        st++;
    }
    return m;

}

// convertAndWrite('C:/Users/lovigame006/Desktop/2019年货节/塔防数值规划.xls','C:/Users/lovigame006/Desktop/2019年货节/towergame.js')