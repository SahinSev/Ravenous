// const clientID     = 'cGthPeaoyr7TV9vlZZeYZQ';
// const secret     = 'vGeIQJau6pEaaV3B3820rQAkD4ga7rvow9aveDxUSwR0Ejw9cMOz2EOjZQwCDiZSBuz_KjOA_-o7V4IAgnaVh_i1IMbQLwWRfTNy4KT3wYWz6yl8nBNnkTSFou0qWnYx';
const clientID = '9alMH8JqU_T_VuNQ58mJJQ';
const secret = 'NJsx3TP5qstd2Al5S4o1GqJsIegw4cyJZ3S54R80FK2u1DzECQAJiNLIa9H203Wv';
let accessToken;

let Yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => 
        resolve(accessToken));
  }
  return fetch(
  	`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientID}&client_secret=${secret}`, {
    
    method:'POST',
    
    }).then(response => {
      return response.json();
    }).then(jsonResponse =>{
        accessToken = jsonResponse.access_token;
      })
     },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers:{
          Authorization: `Bearer ${accessToken}`}
        }).then(response => {
          return response.json();

      }).then(jsonResponse =>
                {
                  if(jsonResponse.businesses){
                  return jsonResponse.businesses.map(business=>({
                    id:business.id,
                    imageSrc: business.image_url,
                    name:business.name,
                    //category:business.categories,
                    category:business.categories[0].title,
                    rating: business.rating,
                    review: business.review_count,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zip: business.location.zip_code

                  }));
                  }


    });

  })
  }
};

export default Yelp;