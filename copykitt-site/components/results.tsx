interface ResultsProps {
  snippet: string;
  keywords: string[];
  onBack: any;
  prompt: string;

}


const Results: React.FC<ResultsProps> = (props) => {

    const keywordsElements = [];
    
    for(let i = 0 ; i < props.keywords.length;i++){
        const element = <div key ={i}>#{props.keywords[i]}</div>
        keywordsElements.push(element)
    }


  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt</b>
          </div>
          {props.prompt}
        </div>

        <div>
          <div>
            <b>Snippet</b>
          </div>
          {props.snippet}
        </div>
        <div>
          <b>Keywords</b>
        </div>
        <div>{keywordsElements}</div>
      </div>
      <button onClick={props.onBack}>back</button>
    </>
  );
};

export default Results;
