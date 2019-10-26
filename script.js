/*global Vue*/
/*global fetch */
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const key = "3188700714688606";
console.log('v11');
let app = new Vue({
  el: "#root",
  data: {
    populars: [
      {name: 'Iron Man', id: '346'},
      {name:  'Thor', id: '659'},
      {name:  'Black Widow', id: '107'},
      {name:  'Captain America', id: '149'},
      {name:  'Hulk', id: '332'},
      {name:  'Captain Marvel', id: '156'},
      {name:  'Spider-Man', id: '620'},
      {name:  'Superman', id: '644'},
      {name:  'Hawkeye', id: '313'},
      {name:  'Batman', id: '69'}],
    character: [],
    summary: [],
    suggestions:[],
    name: '',
    id: '',
    noimage: 'Error! No image found.',
    type: {active: true},
  },
  methods: {
    searchChar(){
      console.log(this.name);
      if(this.name.length < 3){}
      else {
        console.log("In Fetch" + this.name);
        var url = proxyurl + "https://www.superheroapi.com/api.php/3188700714688606/search/" + this.name;
        console.log(url);
        
        fetch(url)
        .then((data)=> {
          return(data.json());
        })
        .then((suggestionlist)=>{
          console.log("Suggestions");
          console.log(suggestionlist);
          this.suggestions = [];
          for (let i = 0; i < suggestionlist.results.length; i++){
            console.log(suggestionlist.results[i].name + ' ' + suggestionlist.results[i].id);
            this.suggestions.push({name: suggestionlist.results[i].name, id: suggestionlist.results[i].id})
          }
        });
      }
    },
    loadChar(id){
      this.type.active = false;
      console.log(id);
      var url = proxyurl + "https://www.superheroapi.com/api.php/3188700714688606/" + id;
      console.log(url);
      fetch(url)
        .then((data)=> {
          return(data.json());
        })
        .then((characterinfo)=>{
          console.log("Character");
          console.log(characterinfo);
          if(characterinfo.response == "success") {
          this.suggestions = [];
          this.character = [];
          this.type.active = true;
          this.character.push(characterinfo);
          this.summary = [
            'Name: ' + this.character[0].name,
            'Powerstats: ',
            'Intelligence: ' + this.character[0].powerstats.intelligence,
            'Strength: ' + this.character[0].powerstats.strength,
            'Speed: ' + this.character[0].powerstats.speed,
            'Durability: ' + this.character[0].powerstats.durability,
            'Power: ' + this.character[0].powerstats.power,
            'Combat: ' + this.character[0].powerstats.combat,
            'Biography: ',
            'Full Name: ' + this.character[0].biography['full-name'],
            'Alter Ego: ' + this.character[0].biography['alter-egos'],
            'Birthplace: ' + this.character[0].biography['place-of-birth'],
            'Appearance: ',
            'Gender: ' + this.character[0].appearance.gender,
            'Race: ' + this.character[0].appearance.race,
            'Height: ' + this.character[0].appearance.height,
            'Weight: ' + this.character[0].appearance.weight,
            'Eye Color: ' + this.character[0].appearance['eye-color'],
            'Hair Color: ' + this.character[0].appearance['hair-color'],
            ];
          }
          else{
            console.log("could not load character");
          }
        });
    },

  }
});
