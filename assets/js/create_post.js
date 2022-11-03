

{

   

     let pageNo=0; 
    
    function postCreationOn(){
        
      $('#container').on('scroll touchmove mousewheel', function(e){
         e.preventDefault();
         e.stopPropagation();
         return false;
       })
      
       $('.create-post').on('scroll touchmove mousewheel', function(e){
         e.preventDefault();
         e.stopPropagation();
         return false;
       }) 

         
       $('#outer-box').on('scroll touchmove mousewheel', function(e){
         e.preventDefault();
         e.stopPropagation();
         return false;
       })

       $('.outer').on('scroll touchmove mousewheel', function(e){
         e.preventDefault();
         e.stopPropagation();
         return false;
       })


        $('.create-post').css({

           opacity:'1',
           overflow:'hidden',
           width:'100%',
           height:'100vh'
        })

        $('.create-icon').css({display:"none"});
        $('.createPost').css({display:"flex"});

    }


    function postCreationOff(){

      $('#container').off('scroll touchmove mousewheel');
      $('.create-post').off('scroll touchmove mousewheel');
      
      $('.outer-box').off('scroll touchmove mousewheel');
      $('.outer').off('scroll touchmove mousewheel');

      $('.create-post').css({
         opacity:'0',
         overflow:'hidden',
         width:'0',
         height:'0',
      })

      $('.create-icon').css({display:"flex"});
      $('.createPost').css({display:"none"});     

  }

function selectingPictureOn(){
    
   $("#select-picture").css({
      overflow:'none',
      width:'25rem',
      height:'27rem',
      position:'relative'
   }) 
      
   $(".post-form").css({
      height:'27rem',
      width:'25rem'
   })
   $("#create-new-post").css({
          
          width:'0',
          height:'0',
          overflow:'hidden',
          position:'absolute'
    })
     pageNo =1;
         
 }
  function selectingPictureOff(){
   $("#select-picture").css({
      overflow:'hidden',
      width:'0',
      height:'0',
      position:'absolute'
   })
  pageNo=2;
         
}

function discardProcessON(){
         
   $('#confirmation-slot').css({
      width:"100%",
      height:'100vh',
      overflow:'none'
     
   })
} 

function discardProcessOff(){
   
    $('#confirmation-slot').css({
      width:"0",
      height:'0',
      overflow:'hidden'
    })
    $('#select-button').val('');
} 



 var createPost= function(){

            postCreationOn();
            pageNo =1;


  let file= $('#select-button')
      
      file.change(function(event){
          console.log("hey");
           var path=URL.createObjectURL(event.target.files[0])
           selectingPictureOff();
   
            $(".post-form").css({
               height:'25rem',
               width:'42rem'
            })
            $('#post-image').attr("src",path);
            $("#create-new-post").css({
                   
                   width:'42rem',
                   height:'25rem',
                   overflow:'none',
                   position:'relative'
            })

            pageNo = 2;
       })    
    }


    var closeTheProcess=function(){

      if(pageNo==1){
       
         postCreationOff();
      }else if(pageNo==2){

             discardProcessON();
      }
    
        
   }

   var discard=function(){
      discardProcessOff();
      selectingPictureOn();
   }

   var continueProcess =function(){
      discardProcessOff();
   }


}