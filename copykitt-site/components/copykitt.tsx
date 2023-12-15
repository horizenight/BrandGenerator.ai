import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo1 from "../public/real.png";

const CopyKitt: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResuls, setHasResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const CHARACTER_LIMIT: number = 32;

  const onSubmit = () => {
    const ENDPOINT: string =
      "https://gr1f1bsuj4.execute-api.us-east-1.amazonaws.com/prod/generate_snippets_and_keywords";

    console.log("Submitting: " + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Aws Credit Expired !");
      }
      return res.json();
    })
    .then(onResult)
    .catch((error) => {
      console.error("Fetch failed:", error);
      setError("WebApp Not working as AWS Hosting Expired ! ");
      setIsLoading(false);
      
    });
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResults(true);
    setIsLoading(false);
  };
  // console.log(snippet)
  // console.log(keywords)

  const onReset = () => {
    setPrompt("");
    setHasResults(false);
    setIsLoading(false);
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
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        characterLimit={CHARACTER_LIMIT}
        isLoading={isLoading}
      />
    );
  }

  
  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto ";



  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-900 p-6 rounded-md text-white">
          <div className="text-center my-6 content-center">
            <Image
              src={logo1}
              className="rounded-md  mx-auto mb-6"
              width={72}
              height={72}
              alt="BrandGenerator"
            />
            <h1 className={gradientTextStyle+" text-3xl font-medium "}>Brand.ai</h1>
          <div className={gradientTextStyle + "  font-thin"}>Your AI branding assistant</div>
          </div>

          {error ? (
            <div className="text-red-500 text-center my-4">{error}</div>
          ) : (
            displayedElement
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyKitt;
