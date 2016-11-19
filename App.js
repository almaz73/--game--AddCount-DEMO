
class App extends React.Component {
   constructor(props) {
      super(props);
      var
         level = 1,
         strict = false,
         obj = randomQuection(level, strict);
      this.state = {
         number1: obj.number1,
         number2: obj.number2,
         sum: obj.sum,
         boxNumers: obj.boxNumers,
         results: [],
         level: level,
         strict: strict,
         totalScore: undefined
      };
   }
   next (val){
      var
         self = this,
         res = self.state.sum == val,
         obj = randomQuection(self.state.level, self.state.strict),
         newResults = this.state.results.concat(res),
         totalScore = this.check(newResults);

      if (totalScore || val == undefined) {
         newResults = [];
      }

      self.setState({
         number1: obj.number1,
         number2: obj.number2,
         sum: obj.sum,
         boxNumers: obj.boxNumers,
         results: newResults,
         totalScore: totalScore
      });
   }
   choiceLevel(val){
      var
         self = this,
         obj = randomQuection(val, self.state.strict);

      if (val=="!"){
         self.setState({strict: !self.state.strict})
         return;
      }

      self.setState({
         level:val,
         results: [],
         number1: obj.number1,
         number2: obj.number2,
         boxNumers: obj.boxNumers,
         sum: obj.sum,
      })
   }

   // если 10 заданий выполнили ставим оценку
   check (newResults){
      var
         answerTrue=0,
         score;

      if(newResults.length==10){
         newResults.map(function (item) {
            if(item){answerTrue++}
         });
         switch (answerTrue){
            case 10: score = 5; break; // ставим оценку
            case 9:
            case 8: score = 4; break;
            case 7:
            case 6: score = 3; break;
            case 5:
            case 4: score = 2; break;
            case 3:
            case 2:
            case 1:
            case 0: score = 1;
         }
      }
      return score;
   }
   render() {
      var state = this.state;
      return (
         <div className="App">
            <div className="App-header">
               <h1>Сколько будет  </h1>
               <span className="App-quection"> {state.number1} + {state.number2} = ? </span>
               {state.totalScore && <Score state={state} onNext={this.next.bind(this)}/>}
               <Resul state={state} />
               <Boxes state={state} onNext={this.next.bind(this)} />
               <Level state={state} inChoiceLevel={this.choiceLevel.bind(this)} />
            </div>
         </div>
       );
   }
}

function Boxes (self){
   var
      p = self.state.boxNumers,
      sum = self.state.sum;

   function handleChice(e){
      var
         answer = e.target.innerText;
      self.onNext(answer)
   }

   return(
      <div className="area">
            {p.map(function(item, index){
               var className = (sum==item)?"boxTrue":"boxFalse"
               className+=" box"
               return(
                  <div
                     key={index}
                     className={className}
                     onClick={handleChice}><p>{item}</p>
                  </div>
               )
            })}
         </div>
   );
}

function Level (self){
   function handleChoice(val) {
      var level = val.target.innerText;
      if (self.inChoiceLevel) {
         self.inChoiceLevel(level);
      }
   }
   var
      level=self.state.level,
      arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!"];

   return (
      <div className="area">
         {arr.map(function(item, index){
            var className = (parseInt(item)<=level)?"circle circleBlack":"circle";
            if (self.state.strict && item=="!"){
               className="circle circleBlack";
            }
            return <div key={index} onClick={handleChoice} className={className}>{item}</div>
         })}
      </div>
   )

}

function Resul(props){
   var results = props.state.results;
   return(
      <div className = "result">
         {results.map(function(item, index){
            var className = (item)?"resultBox resultBoxTrue": "resultBox resultBoxFalse";
            return <div key={index} className={className}></div>
         })}
      </div>
   )
}

function Score(self){
   var totalScore = self.state.totalScore,
      text,
      src = "img/"+totalScore+".png",
      soundUrl = "mp3/viktorina.mp3";

   if(totalScore==5){
      new Audio(soundUrl).play();
   }

   switch (totalScore){
      case 5: text = "ОТЛИЧНО!"; break;
      case 4: text = "ХОРОШО!"; break;
      case 3: text = "НЕ ОЧЕНЬ"; break;
      case 2: text = "ПЛОХО!"; break;
      case 1: text = "ОЧЕНЬ ПЛОХО!"; break;
   }

   function handleClick(){
      self.onNext();
   }

   return(
      <div  className="scoreFon">
         <div  className="score"  onClick={handleClick}><br/>
            <img src={src}/>
            {text}
         </div>
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById("root"));