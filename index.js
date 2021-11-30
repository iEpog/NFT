const { createCanvas, loadImage } = require("canvas");
let db = require('db.simple')
let DB = new db.Database()


const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");
let fs = require('fs')


let Create = async()=>{
    let dna =''
    let metaData ={}
    let DNAData = {}
    const saveImage = (ed,sayi) => {
        fs.writeFileSync(
          `./output/${ed}.png`,
          canvas.toBuffer("image/png")
        );
        fs.writeFileSync(
            `./output/${sayi}.json`,
            JSON.stringify(metaData, null, 2)
          );

      };
    let background = async ()=>{

        var bg = fs.readdirSync('./in/backgrounds/')
    let chosenFile = bg[Math.floor(Math.random() * bg.length)] 
    let img = await loadImage('./in/backgrounds/'+chosenFile)
      ctx.drawImage(img,-5,-5,1200,1200);
      dna=dna+=chosenFile.split('.png')[0]+'|' 
      DNAData['background'] = chosenFile .split('.png')[0]
    }
    await background()
    let sGameNumber = ()=>{
        function p(nUM, s) {
            var num = "000000000" + nUM
            return num.substr(num.length-s)
        }

        function randomNumber(from, to) {
            var r = Math.random()
            return Math.floor(r * (to - from) + from)
        }
            return p(randomNumber(1,457),3)
    }


    let suit = async ()=>{

        var bg = fs.readdirSync('./in/suit/')
    let chosenFile = bg[Math.floor(Math.random() * bg.length)] 

    let img = await loadImage('./in/suit/'+chosenFile)
      ctx.drawImage(img,0,0);
      dna=dna+=chosenFile.split('.png')[0]+'|' 
      DNAData['suit'] = chosenFile .split('.png')[0]

    }
  
    await suit()

    let window = async ()=>{

        var bg = fs.readdirSync('./in/window/')
    let chosenFile = bg[Math.floor(Math.random() * bg.length)] 

    let img = await loadImage('./in/window/'+chosenFile)
      ctx.drawImage(img,0,0);
      dna=dna+=chosenFile.split('.png')[0]+'|' 
      DNAData['window'] = chosenFile .split('.png')[0]

    }
  
    await window()


    let head = async ()=>{

        var bg = fs.readdirSync('./in/heads/')
    let chosenFile = bg[Math.floor(Math.random() * bg.length)] 
    let img = await loadImage('./in/heads/'+chosenFile)
      ctx.drawImage(img,0,0);
      dna=dna+=chosenFile.split('.png')[0]+'|' 
      DNAData['head'] = chosenFile .split('.png')[0]

    }
  
    await head()



    let accessories = async ()=>{

        var bg = fs.readdirSync('./in/accessories/')
        if(DNAData['suit'].includes('SGAME'))
        {


        bg = bg.filter(r=>r.includes('SGAMEP'))
    let chosenFile = bg[Math.floor(Math.random() * bg.length)] 
    let img = await loadImage('./in/accessories/'+chosenFile)
      ctx.drawImage(img,0,0);
      ctx.fillStyle = "#245245";
      ctx.font = "bold 30pt Verdana";
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      ctx.fillText('067' ,582, 755);
      dna=dna+=chosenFile.split('.png')[0]+'|' 
      DNAData['accessories'] = chosenFile .split('.png')[0]
        }else{
            bg = bg.filter(r=>!r.includes('SGAMEP'))
            let chosenFile = bg[Math.floor(Math.random() * bg.length)] 
            let img = await loadImage('./in/accessories/'+chosenFile)
              ctx.drawImage(img,0,0);
              dna=dna+=chosenFile.split('.png')[0]+'|' 
              DNAData['accessories'] = chosenFile .split('.png')[0]
        }
    }   
  
    await accessories()

    let mask = async ()=>{

      var bg = fs.readdirSync('./in/masks/')
  let chosenFile = bg[Math.floor(Math.random() * bg.length)] 

  let img = await loadImage('./in/masks/'+chosenFile)
    ctx.drawImage(img,0,20);
    dna=dna+=chosenFile.split('.png')[0]+'|' 
    DNAData['mask'] = chosenFile .split('.png')[0]

  }

  await mask()
  let lamp = async ()=>{

    var bg = fs.readdirSync('./in/lamp/')
let chosenFile = bg[Math.floor(Math.random() * bg.length)] 
let img = await loadImage('./in/lamp/'+chosenFile)
  ctx.drawImage(img,0,0);
  dna=dna+=chosenFile.split('.png')[0]+'|' 
  DNAData['lamp'] = chosenFile .split('.png')[0]

}

await lamp()


    var outpucuk = fs.readdirSync('./output/')

    let sad  =outpucuk.filter(r=>r.endsWith('.png')).length+1
      metaData['createDate']= Date.now()
    metaData['id']=outpucuk.filter(r=>r.endsWith('.png')).length+1
    metaData['description'] = 'Epog\'s Image Generator AI'
    metaData['DNA'] = btoa(dna)
    metaData['DNAData'] = DNAData 
    
    if(!DB.get(btoa(dna))){
      DB.set(btoa(dna),metaData)
	  console.log('New Image! C: '+ (outpucuk.filter(r=>r.endsWith('.png')).length+1)+' \nDNA: '+dna +' '+btoa(dna))
          saveImage(sad+'-'+btoa(dna), outpucuk.filter(r=>r.endsWith('.png')).length+1)
          Create()
    }
    else{
      console.log('DNA exists!')
      DB.set(btoa(dna),metaData)
      Create()
    }
  }
Create()