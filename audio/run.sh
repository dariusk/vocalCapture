#sox in.wav temp.wav silence 1 0.1 1% reverse && sox temp.wav out.wav silence 1 0.1 1% reverse
#sox in.wav out.wav silence 1 0.1 1% reverse silence 1 0.1 1% reverse
for f in *.wav;
  do echo "Processing $f file..";
  sox $f temp.wav silence 1 0.1 1% 1 0.05 1.1%
  sox temp.wav $f silence 1 0.1 1% 1 0.05 1.1%
done
rm temp.wav
