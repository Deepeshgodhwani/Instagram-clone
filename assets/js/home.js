


{

// signin //

var signin= function(indicator){
   
      if(indicator==1){

        $('.signup-container').css({

            width: '0',
            height: '0',
            overflow: 'hidden'
        })

        $('.signin-container').css({

            width: '27%',
            height: '90%',
            overflow:'none'
         })

      }else{

          $('.signin-container').css({

            width: '27%',
            height: '90%',
            overflow:'none'
           })

          
      }     
    }

var signup =function(indicator){

        
      if(indicator==1){

        $('.signin-container').css({

            width: '0',
            height: '0',
            overflow: 'hidden'
        })

        $('.signup-container').css({

            width: '27%',
            height: '90%',
            overflow:'none'
         })

      }else{

          $('.signup-container').css({

            width: '27%',
            height: '90%',
            overflow:'none'
           })

          
      }   

        
}



}




