document.addEventListener("DOMContentLoaded" , () => {
    let listDiv=document.getElementById("collection_list");
    let modal = document.getElementById("myModal");
    let viewAll=document.getElementById("viewAll")
    let collectionList=[]
    let collection=localStorage.getItem("collection")

    let btn = document.getElementById("myBtn");

    let span = document.getElementsByClassName("close")[0];
    let submit = document.getElementById("submit");
    let thumbnail = document.getElementById("thumbnail");
    let pictures = document.getElementById("pictures");
    const viewCollection=(collection)=>{
        viewAll.style.display = "block";
        console.log(collection)
      let collectionContent=document.getElementById("AllView");
    //   let content = document.createElement('div');
      collectionContent.innerHTML=`<div class="container details">
    
      <h2>${collection.name}</h2>
      <div class="views">
      <div class="topDesc">
      <img src="${collection.thumbnail}" class="thumbnail" alt="thumbnail" style="width:80%">  <h4>${collection.description}</h4>
      </div>
      <div class="images" id="pictures">
         ${ displayImages(collection.pictures)}
      </div>
      </div>
  </div>
  `
 
    }

    const displayImages=(images)=>{
        const domPaser=new DOMParser()
       let content = document.createElement("div")
        images.forEach(image=>{
          let  contentImage = document.createElement('div');
          contentImage.innerHTML=`<div class="element"> <img src="${image}" alt="thumbnail" style="width:80%"> </div>
          `
          content.appendChild(contentImage)
        })
        return content.innerHTML;
    }
    const addCollection=(collection)=>{
        let viewId='view-'+collection.id;
        let editId='edit-'+collection.id;
        let deleteId='delete-'+collection.id;
    
            let content = document.createElement('div');
            content.innerHTML=`<div class="card">
            <img src="${collection.thumbnail}" alt="thumbnail" style="width:80%">
            <div class="container">
                <h4>${collection.pictures.length}   <b>${collection.name}</b></h4>
                <p>${collection.description}</p>
                <div class="card-grid buttons">
                <button id="${viewId}" class="view_collection">View</button> <button id="${editId}" class="edit_collection">Edit</button><button id="${deleteId}" class=""delete_collection>delete</button>
              
            </div></div>
        </div>`
         
        listDiv.appendChild(content)
            let viewbtn=document.getElementById(viewId)
            viewbtn.addEventListener('click',()=>{
                viewCollection(collection)
            })
            let deleteView=document.getElementById(deleteId);
            deleteView.addEventListener('click',()=>{
                deletCollection(collection.id)
            })
    }
    const deletCollection=(collectionId)=>{
        collectionList=JSON.parse(collection)
        console.log("collectionList>>",collectionList)
        let collectionCopy=[]
        collectionList.forEach(element => {
           if(element.id!=collectionId){
            collectionCopy.push(element)
           }
        });
        localStorage.setItem("collection",JSON.stringify(collectionCopy))
        location.reload();
    }
    let collectionObject={
        name:"",
        description:"",
        thumbnail:"",
        pictures:[],
        id:""
    }
    if(collection!=null){
        collectionList=JSON.parse(collection)
        console.log("collectionList>>",collectionList)
        collectionList.forEach(element => {
            addCollection(element)
        });
    }
    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
        viewAll.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == viewAll) {
            viewAll.style.display = "none";
        }
    }
    thumbnail.addEventListener('change', () => {
        const file = thumbnail.files[0];
        const reader = new FileReader();
    
        reader.addEventListener('load', () => {
            collectionObject.thumbnail = reader.result;
            // console.log("URL: ",reader.result)
        });
    
        reader.readAsDataURL(file);
      });
      pictures.addEventListener('change', () => {
        const files= pictures.files;
        for(let fileIndex=0;fileIndex<files.length;fileIndex++){
            const file=files[fileIndex]
            const reader = new FileReader();
    
            reader.addEventListener('load', () => {
                // console.log("URL: ",reader.result)
                collectionObject.pictures.push(reader.result);
            });
        
            reader.readAsDataURL(file);
        }

           
      
       
      });
    submit.onclick = function () {
     
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;

        collectionObject.name=name;
        collectionObject.description=description
        collectionObject.id=makeId(10)
 

//   const image = document.getElementById('image');
  

    if(collection==null){
        collectionList.push(collectionObject)
        localStorage.setItem("collection",JSON.stringify(collectionList))
    }
    else{
        collectionList=JSON.parse(collection)
        collectionList.push(collectionObject)
        localStorage.setItem("collection",JSON.stringify(collectionList))
      
    }
    addCollection(collectionObject)

    }
    const makeId = (length) => {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charatersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.random() * charatersLength);
        }
        return result;
      };


});