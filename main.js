let register = null

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function(){
    console.log("hey guy!");
    
    window.navigator.serviceWorker.register("sw.js").then(function(res){
      register = res;
      console.log('SW registrado');
    }, function(err){
      console.log("SW falló: ",err);
    })

  })
}