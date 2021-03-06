# pol-simon
Generative impressionism

### build training set
```
git clone git@github.com:wboykinm/pol-simon.git
npm install
node index.js <artist name> > pol.txt
```

### set up processing image
```
docker run --rm -ti crisbal/torch-rnn:base bash
# (in another terminal window:)
docker cp pol.txt d55a83d09065:/home/
```

### preprocess and train model
```
# (back in docker bash prompt:)
python scripts/preprocess.py \
--input_txt /home/pol.txt \
--output_h5 data/pol.h5 \
--output_json data/pol.json

# run without GPU (because mac)
th train.lua \
-input_h5 data/pol.h5 \
-input_json data/pol.json \
-gpu -1
# (wait awhile)
```

### generate some lyrics
```
# get 10000 characters of crazy:
th sample.lua -checkpoint cv/checkpoint_5000.t7 -length 10000 -gpu -1 > /home/pol-out.txt
# (back in the other terminal window:)
docker cp d55a83d09065:/home/pol-out.txt .
```

## Thanks
- To [Dan Hon](https://medium.com/@hondanhon/i-trained-a-neural-net-to-generate-british-placenames-9460e907e4e9)
- To [Justin Johnson](https://github.com/jcjohnson/torch-rnn)
- To [Cristian Baldi](https://github.com/crisbal/docker-torch-rnn)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
