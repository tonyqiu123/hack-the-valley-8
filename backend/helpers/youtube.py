import requests
import json
# from youtube_transcript_api import YouTubeTranscriptApi
import cohere

def get_video_description(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key=AIzaSyDLfuJ9duWPTPVtcgyg1yAMN7xWvPR3O3U"
    response = requests.get(url)
    data = json.loads(response.text)
    # return data['items'][0]['snippet']['description']
    return data['items'][0]['snippet']['description']

# this is too large of a dataset for free cohere api
# def get_transcript(video_id):
#     transcript = YouTubeTranscriptApi.get_transcript(video_id)
#     full_transcript = " ".join([i['text'] for i in transcript])
#     return full_transcript

# def summarize_text(text):
#     co = cohere.Client('CekvF2K8mMYRlHb69H0mjicbkRI62n3i5f4cXZ5R')
#     response = co.summarize(text=text, length='auto', format='auto', model='summarize-xlarge', additional_command='', temperature=0.3)
#     return response.summary

# tests
# video_description = get_video_description('w8q0C-C1js4')
# print(video_description)