

const addbtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");


//////////////////////BOLD ITALIC UNDERLINE////////////////////

function setBold () {
  document.execCommand('bold');
}

function setItalic() {
  document.execCommand('italic');
}
function setUnderline(){
  document.execCommand('underline');
}

/////////////////SEARCH FUNCTIONALITY///////////////////////////

const search = () => {
  const input = document.getElementById("find");

  input.addEventListener("keyup", (e) => {
    const searchdata = e.target.value.toLowerCase();
    
    const notes = document.querySelectorAll(".note");
    
    notes.forEach((note) => {
      const title = note.querySelector("#title-name").value.toLowerCase();
      const text = note.querySelector(".main-text").innerHTML.toLowerCase();
      const date = note.querySelector(".date").textContent.toLowerCase();
      
      if (title.includes(searchdata) || text.includes(searchdata) || date.includes(searchdata)) {
        note.style.display = "block";
      } else {
        note.style.display = "none";
      }
    });
  });
}

search();

////////////////enable-dark Mode////////////////////////////

var mode_icon = document.getElementById("modeicon");
var chngplus = document.getElementById("addnote");
var chngsearch = document.getElementById("search");

 var chngbold = document.getElementById("bold-icon");
 var chngitalic = document.getElementById("italic-icon");
 var chngul = document.getElementById("underline-icon");



  mode_icon.addEventListener("click",()=>{

    document.body.classList.toggle("dark-theme");

    var theme;
    if (document.body.classList.contains("dark-theme")) {
       mode_icon.src ="sun.png";
      chngplus.src="plus-white.png";
      chngsearch.src="Search-white.png";
      
      document.querySelectorAll('#bold-icon, #italic-icon, #underline-icon').forEach((icon) => {
        const iconId = icon.id;
        if (iconId === 'bold-icon') {
          icon.src = "bold-white.png";
        } else if (iconId === 'italic-icon') {
          icon.src = "italic-white.png";
        } else if (iconId === 'underline-icon') {
          icon.src = "underline-white.png";
        }
      });
      


      theme="Dark";
      localStorage.setItem("Theme" ,JSON.stringify(theme));

    }
    else{
      chngplus.src="plus.png";
      chngsearch.src="Search-icon.png";
      mode_icon.src ="moon.png";

      document.querySelectorAll('#bold-icon, #italic-icon, #underline-icon').forEach((icon) => {
        const iconId = icon.id;
        if (iconId === 'bold-icon') {
          icon.src = "bold-black.png";
        } else if (iconId === 'italic-icon') {
          icon.src = "italic-black.png";
        } else if (iconId === 'underline-icon') {
          icon.src = "underline-black.png";
        }
      });

      theme="Light";
      localStorage.setItem("Theme" ,JSON.stringify(theme));
    }
  

  })

addbtn.addEventListener("click", function () {

      addnote();

});

  const savenote = () => {

  const notes = document.querySelectorAll(".note .main-text");
  const title = document.querySelectorAll("#title-name");
   var Date = document.querySelectorAll(".note .date");
   

  const data1 = [];
  const data2 = [];
  const data3 = [];

  notes.forEach((note) => {
    data1.push(note.innerHTML);
  });

  title.forEach((note) => {
    data2.push(note.value);
  });

  
    Date.forEach((date) => {
      data3.push(date.textContent);
  });
  
  if (data1.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data1));
  }

  if (data2.length === 0) {
    localStorage.removeItem("title");
  } else {
    localStorage.setItem("title", JSON.stringify(data2));
  }

  if (data3.length === 0) {
    localStorage.removeItem("date");
  } else {
    localStorage.setItem("date",JSON.stringify(data3));
  }

  // const noteText = document.querySelector(".main-text").innerHTML;
  //   const noteTitle = document.querySelector("#title-name").value;
  //   const noteDate = document.querySelector(".date").textContent;

  //   const notes = JSON.parse(localStorage.getItem("notes")) || [];
  //   const titles = JSON.parse(localStorage.getItem("title")) || [];
  //   const dates = JSON.parse(localStorage.getItem("date")) || [];

  //   const index = Array.from(main.children).indexOf(note);

  //   notes[index] = noteText;
  //   titles[index] = noteTitle;
  //   dates[index] = noteDate;

  //   localStorage.setItem("notes", JSON.stringify(notes));
  //   localStorage.setItem("title", JSON.stringify(titles));
  //   localStorage.setItem("date", JSON.stringify(dates));

};

// ----------------------------------------------------------------
 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let currentdate =new Date();
  let month= months[currentdate.getMonth()];
   let day = currentdate.getDate();
   let year = currentdate.getFullYear(); 

 let fulldate = day + ' ' + month + ',' + year;
 var Date = document.getElementsByClassName(".date");
  const data3 = [];

  ////////////////////////////////////////////////////////////////////////////////////////////

  function sanitizePastedText(e) {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }

const addnote = (text = "", text2 = "", date=fulldate) => {

  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <header>
    <div class="title">
                <input type="text" id="title-name" placeholder="Title" value="${text}">
            </div>
    <div class="tool-bar">
    <img src="Icons/Save-PNG.png" class="save">
    <img src="Icons/Delete-PNG.png" class="delete">
</div>
</header>
<div class="hello">

      <div class="main-text-wrapper">
          <div class="main-text" contenteditable="true" spellcheck="false" id="main-text">${text2}</div>
          <div class="placeholder">Add Your Note...</div>
      </div>
    
    <div class="footer"> 
                    <div>
                <p class="date">${date}</p> 
            </div>
            </div>
</div>
    `;

    note.querySelector('.main-text').addEventListener('paste', sanitizePastedText);
    function sanitizePastedText(e) {
      e.preventDefault();
      const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    }

    const mainText = note.querySelector(".main-text");
    const placeholder = note.querySelector(".placeholder");

    const togglePlaceholder = () => {
        if (mainText.textContent.trim() === "") {
            placeholder.style.display = "block";
        } else {
            placeholder.style.display = "none";
        }
    };

    mainText.addEventListener("focus", () => {
        placeholder.style.display = "none";
    });

    mainText.addEventListener("blur", togglePlaceholder);
    mainText.addEventListener("input", togglePlaceholder);

    togglePlaceholder();


  note.querySelector(".delete").addEventListener("click", function () {
    const result = confirm("Are You Want To Delete");

    if (result) {
      note.remove();
    }
    savenote();
  });

  note.querySelector(".save").addEventListener("click", function () {

    document.addEventListener("keydown", e => { 
      if( e.key.toLowerCase()==="s"&& e.ctrlKey)
      {
        savenote();
      }
    });

    note.querySelector('.main-text').addEventListener('paste', sanitizePastedText);

   savenote();
  
  });

  note.querySelector(".main-text").addEventListener("focusout", function () {
    savenote();
  });

  note.querySelector("#title-name").addEventListener("focusout", function () {
    savenote();
  });

  main.appendChild(note);
};

document.addEventListener('DOMContentLoaded', () => {
  const mainTextAreas = document.querySelectorAll('.main-text');
  mainTextAreas.forEach(textArea => {
    textArea.addEventListener('paste', sanitizePastedText);
  });
});


( function () {

   
      const lsnotes=JSON.parse(localStorage.getItem("notes"));
      const lstitle=JSON.parse(localStorage.getItem("title"));
      let lsdate=JSON.parse(localStorage.getItem("date"));



      if(lstitle === null ){
     
         addnote()
        
      }
      else{
        lstitle.forEach(
              (lsTitle,r=0)=>{
                
                  addnote(lsTitle,lsnotes[r],lsdate[r])
              
              }
          )
      }

      const gettheme=JSON.parse(localStorage.getItem("Theme"));
      if(gettheme === "Dark"){
      
        document.body.classList.toggle("dark-theme");
        mode_icon.src ="sun.png";
        chngplus.src="plus-white.png";
        chngsearch.src="Search-white.png";
      
        // document.querySelectorAll('#bold-icon, #italic-icon, #underline-icon').forEach((icon) => {
        //   const iconId = icon.id;
        //   if (iconId === 'bold-icon') {
        //     icon.src = "bold-white.png";
        //   } else if (iconId === 'italic-icon') {
        //     icon.src = "italic-white.png";
        //   } else if (iconId === 'underline-icon') {
        //     icon.src = "underline-white.png";
        //   }
        // });
        
      
      }

    
     
})();

search();


