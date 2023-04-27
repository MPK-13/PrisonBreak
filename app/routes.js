//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here




router.post('/room-centre', function(request, response) {

    var direction = request.session.data['direction']
    request.session.data['error']= false ;
    
    if (direction == "north"){
        response.redirect("/north-wall")
    } 
    else if (direction == "east"){
        response.redirect("/east-wall")
    }
    else if (direction == "south"){
        response.redirect("/south-wall")
    }
    else if (direction == "west"){
        response.redirect("/west-wall")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/room-centre")
    }
})
router.post('/north-wall', function(request, response) {

    var x = request.session.data['northwallaction']
    request.session.data['error']=false;
    
    if (x == "back"){
        response.redirect("/room-centre")
    } 
    else if (x == "door"){
        response.redirect("/door")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/panel")
    }
})
router.post('/east-wall', function(request, response) {

    var x = request.session.data['eastwallaction']
    request.session.data['error']=false;
    
    if (x == "back"){
        response.redirect("/room-centre")
    } 
    else if (x == "inspect"){
        response.redirect("/canvas-picture")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/east-wall")
    }
})
router.post('/south-wall', function(request, response) {

    var x = request.session.data['southwallaction']
    request.session.data['error']=false;
    
    if (x == "back"){
        response.redirect("/room-centre")
    } 
    else if (x == "inspect"){
        response.redirect("/inspect-train")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/south-wall")
    }
})
router.post('/west-wall', function(request, response) {

    var x = request.session.data['westwallaction']
    request.session.data['error']=false;
    
    if (x == "back"){
        response.redirect("/room-centre")
    } 
    else if (x == "notebook"){
        response.redirect("/notebook")
    }
    else if (x == "paper"){
        response.redirect("/paper")
    }
    else if (x == "book"){
        response.redirect("/book")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/west-wall")
    }
})
router.post('/inspect-train', function(request, response) {

    var x = request.session.data['keyaction'];
    request.session.data['error']=false;
    
    if (x == "back"){
        response.redirect("/south-wall")
    } 
    else if (x == "insertkey"){
        request.session.data['haskey']="false";
        response.redirect("/inspect-train")
    }
    else if (x == "removekey"){
        request.session.data['haskey']="true";
        response.redirect("/inspect-train")
    }
    else if (x == "wind"){
        response.redirect("/wind-train")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/inspect-train")
    }
})
router.post('/panel', function(request, response) {

    var x = request.session.data['panelaction'];
    request.session.data['error']=false;
    
    if (x == "back"){
        response.redirect("/north-wall")
    } 
    else if (x == "key"){
        response.redirect("/key")
    }
    else if (x == "combination"){
        response.redirect("/combination")
    }
    else{
        request.session.data['error']=true;
        response.redirect("/inspect-train")
    }
})
router.post('/combination', function(request, response) {

    var x = request.session.data['combination'];
    request.session.data['error']=false;
    
    if (x == "187392"){
        response.redirect("/finish")
    } 
    else{
        request.session.data['error']=true;
        response.redirect("/combination")
    }
})



// get example
router.get('/calculation', function(request, response) {
    var apple_price = 0.89;
    var banana_price = 0.63;
    var pear_price = 0.43;

    request.session.data['total_for_apples'] = request.session.data['no_of_apples'] * apple_price;
    request.session.data['total_for_bananas'] = request.session.data['no_of_bananas'] * banana_price;
    request.session.data['total_for_pears'] = request.session.data['no_of_pears'] * pear_price;

    request.session.data['order_total'] =  request.session.data['total_for_apples']+request.session.data['total_for_bananas']+request.session.data['total_for_pears'];

    response.redirect('/get-example-output');
})

router.post('/get-example-input', function(request, response) {
    request.session.data['error'] = false;
    request.session.data['apple_error'] = false;
    request.session.data['banana_error'] = false;
    request.session.data['pear_error'] = false;


if(request.session.data['no_of_apples']>10 || request.session.data['no_of_bananas']>10 || request.session.data['no_of_pears']>10){
    request.session.data['error'] = true;
    if(request.session.data['no_of_apples']>10){
        request.session.data['apple_error'] = true;
    }
    if(request.session.data['no_of_bananas']>10){
        request.session.data['banana_error'] = true;  
    }
    if(request.session.data['no_of_pears']>10){
        request.session.data['pear_error'] = true;
    }
    response.redirect("/get-example-input") ;
}
else{
    response.redirect("/calculation")  
}
    
})