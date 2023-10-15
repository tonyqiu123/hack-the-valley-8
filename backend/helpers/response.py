import os
import cohere

def generate_response(msg):
    # use cohere API to generate response
    co = cohere.Client('CekvF2K8mMYRlHb69H0mjicbkRI62n3i5f4cXZ5R')
    response = co.generate(
        model='command-xlarge-nightly',  # model name
        prompt=msg,  # message to generate a response for
        max_tokens=300,  # maximum length of the generated response
        temperature=0.9,  # randomness of the output
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
