from fastapi import FastAPI,HTTPException
from copykitt import generate_branding_snippet,generate_keywords
app = FastAPI()



# uvicorn copykitt_api:app --reload

MAX_INPUT_LENGTH = 32




@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": []}

# uvicorn copykitt_api:app --reload

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet":None,"keywords": keywords}



@app.get("/generate_snippets_and_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet":snippet,"keywords": keywords}


def validate_input_length(prompt: str) -> bool:
    if len(prompt) <= MAX_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail="Input Length Exceeded")
    pass









