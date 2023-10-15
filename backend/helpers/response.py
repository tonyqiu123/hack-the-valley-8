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
    summ = summarize_text(get_video_description(v_id))

    co = cohere.Client('CekvF2K8mMYRlHb69H0mjicbkRI62n3i5f4cXZ5R')

    response = co.generate(
        model='command-xlarge-nightly',
        prompt=summ + msg,
        max_tokens=300,
        temperature=0.2
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
