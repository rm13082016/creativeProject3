const proxyurl = "https://cors-anywhere.herokuapp.com/";
const key = "3188700714688606";
let app = new Vue({
  el: "#root",
  data: {
    populars: ['Iron Man', 'Thor', 'Black Widow', 'Captain America', 'Hulk', 'Captain Marvel', 'Spiderman', 'Vision', 'Hawkeye', 'Stan Lee'],
    characters: [],
    suggestions:[],
    name: '',
    id: '',
    current: {
      name: '',
      powerstats:{
        intelligence: '',
        strength: '',
        speed: '',
        durability: '',
        power: '',
        combat: ''
      },
      biography: {
        full_name: '',
        alter_egos: '',
        aliases: '',
        birthplace: ''
      },
      appearance:{
        gender: '',
        race: '',
        height: '',
        weight: '',
        eye_color: '',
        hair_color: ''
      }
    },
  },
  methods: {
    searchChar(){
      console.log(this.name);
      if(this.name.length < 3){}
      else {
        var url = proxyurl + "https://www.superheroapi.com/api.php/3188700714688606/search/" + this.name;
        console.log(url);
        var request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onload = function() {
          var data = JSON.parse(this.response);
          console.log(data);
          if(data.response == "success") {
            this.suggestions = [];
            for(let i = 0; i < data.results.length; i++){
              console.log(data.results[i].name);
              this.suggestions.push({ name: data.results[i].name, value: data.results[i].id });
              this.suggestions.push({ name: "Bob"});
            }
          }
        }
        request.send()
      }
    },
    loadChar(id){
      console.log(id);
      var url = proxyurl + "https://www.superheroapi.com/api.php/3188700714688606/" + id;
      console.log(url);
      var request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data);
      }
      request.send()
    }
  }
});