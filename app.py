from flask import Flask, request, jsonify
import youtube_dl

app = Flask(__name__)

@app.route('/download', methods=['POST'])
def download_video():
    data = request.get_json()
    video_url = data.get('url')

    if not video_url:
        return jsonify({'error': 'No URL provided'}), 400

    ydl_opts = {}
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(video_url, download=False)
        video_url = info_dict.get("url", None)
        formats = info_dict.get("formats", [])

    return jsonify({
        'formats': [
            {'resolution': f['format'], 'url': f['url']} for f in formats
        ]
    })

if __name__ == '__main__':
    app.run(debug=True)