import { useState } from "react"

export const QrCode = () => {

    const [img, setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrdata,setqrdata]=useState("https://");
    const [qrsize,setQrSize]=useState("150");

async function QrGenerator (){
    setLoading(true);
    try{ 
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
        setImg(url);
    }
    catch(error){
        console.error("Error generating Qr code");
    }
    finally{
        setLoading(false);
    }
}
function QrDownloader (){
    fetch(img)
    .then((response)=>response
    .blob()).then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="Qrcode.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
    .catch((error)=>{
        console.error("Erroe downloading QR Code",error)
    });
}

  return (
    <>
    <div className="app-container">
         
            <h1>QR-code Generator</h1>
            {loading && <p>Please Wait...</p>}
            {img && <img src={img} className="Qr-code-image" />}
            <div>
            <label htmlFor="datainput"  className="input-lable">
                Data for QR Code 
            </label>
            <input type="text" value={qrdata} className="datainput"  placeholder="Enter data for QR" onChange={(e)=>setqrdata(e.target.value)}/>
            <label htmlFor="sizeinput" className="input-lable">
                Image size 
            </label>
            <input type="text" value={qrsize} className="datainput" placeholder="(e.g., 150)" onChange={(e)=>setQrSize(e.target.value)}/>
            <button className="Generate-button" disabled={loading} onClick={QrGenerator}>Generate QR Code</button>
            <button className="Download-qr" onClick={QrDownloader}>Download QR code</button>

            </div>
    </div>
    </>
)
   
    
}
