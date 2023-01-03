import React from "react";
import Form from "./form";
import Results from "./results";
const CopyKitt: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResuls, setHasResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const CHARACTER_LIMIT :number = 32

  const onSubmit = () => {


    const ENDPOINT: string =
      "https://gr1f1bsuj4.execute-api.us-east-1.amazonaws.com/prod/generate_snippets_and_keywords";

    console.log("Submitting: " + prompt);
    setIsLoading(true)
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResults(true);
    setIsLoading(false)
  };
  // console.log(snippet)
  // console.log(keywords)

  const onReset = () => {
    setPrompt("");
    setHasResults(false);
    setIsLoading(false)
  };

  let displayedElement = null;

  if (hasResuls) {
    displayedElement = (
      <Results
        prompt={prompt}
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
      />
    );
  } else {
    displayedElement = (
      <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} characterLimit={ CHARACTER_LIMIT} isLoading={isLoading} />
    );
  }

  return (
    <>
      <h1>CopyKitt!</h1>

      {displayedElement}
    </>
  );
};

export default CopyKitt;
