import requests
import json
from youtube_transcript_api import YouTubeTranscriptApi
import cohere
import re

def get_video_description(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key=AIzaSyDLfuJ9duWPTPVtcgyg1yAMN7xWvPR3O3U"
    response = requests.get(url)
    data = json.loads(response.text)
    trimmed_data = re.sub(r'\n+', ' ', data['items'][0]['snippet']['description'])
    return trimmed_data

def time_format(datetime_str):
    ...
    return re.sub(r'(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\.\d{6}', r'\1T\2', datetime_str)

# this is too large of a dataset for free cohere api
def get_transcript(video_id):
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    full_transcript = " ".join([i['text'] for i in transcript])
    return full_transcript

# tests
# video_description = get_video_description('w8q0C-C1js4')
# print(video_description)