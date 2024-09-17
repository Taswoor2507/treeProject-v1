import React from 'react'

const Tree = (treeData) => {
    console.log(treeData.tree)
  return (
    <div>
         <div className="w-[250px]">
             <img src={"https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478087.jpg?t=st=1726600357~exp=1726603957~hmac=57ee43e7f1c79b233447aaa91d707f3e3f24e969e5b793407bf31ec1bc08b907&w=740"} className="w-full"/>
         </div>
         <div>
            <h2>Name :{treeData.tree.treeName}</h2>
            <p>Type : {treeData.tree.type}</p>
            <p>Location : {treeData.tree.location}</p>
           <img src={treeData.tree?.qrCode?.qrCodeUrl}/>
         </div>
            
        </div>
  )
}

export default Tree
