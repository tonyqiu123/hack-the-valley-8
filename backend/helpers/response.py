import os
import cohere
import re
import numpy as np
from helpers.models import get_video_description

def generate_response(msg, link):
    pattern = r'(?:https://|http://|)(?:www\.)?(?:youtube\.com|youtu\.be)/(?:watch\?v=|v/|embed/|)([A-Za-z0-9_-]+)'
    v_id = ''
    match = re.search(pattern, link)
    if match:
        v_id = match.group(1)

    co = cohere.Client('CekvF2K8mMYRlHb69H0mjicbkRI62n3i5f4cXZ5R')

    summary_prompt = co.generate(
        model='command-xlarge-nightly',
        prompt="I want you to ask me for a video summary",
        max_tokens=40,
        temperature=0.9
    )

    (s1, s2) = co.embed([summary_prompt[0].text.strip(), msg]).embeddings
    similarity = np.dot(s1, s2) / (np.linalg.norm(s1) * np.linalg.norm(s2))
    
    
    if similarity > 0.5:
        ...
        desc = get_video_description(v_id)
        return summarize_text(desc)

    else:
        response = co.generate(
            model='command-xlarge-nightly',  # model name
            prompt=msg,  # message to generate a response for
            max_tokens=300,  # maximum length of the generated response
            temperature=0.2,  # randomness of the output
        )
        
        res = response.generations[0].text  # get the generated text

        return res

def summarize_text(text):
    try:
        co = cohere.Client('CekvF2K8mMYRlHb69H0mjicbkRI62n3i5f4cXZ5R')
        response = co.summarize(text=text, length='auto', format='auto', model='summarize-xlarge', additional_command='', temperature=0.3)
        return response.summary
    except:
        # text too long for cohere api
        return ""
