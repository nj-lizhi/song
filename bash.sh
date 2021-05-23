# 批量将flac文件转换为mp3文件
for i in *.flac; do ffmpeg -i "$i" -ab 320k -map_metadata 0 -id3v2_version 3 "${i%.*}.mp3"; done;