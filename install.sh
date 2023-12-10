#!/usr/bin/bash

pip3 install -r requirements.txt
sudo ln cam.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start cam
sudo systemctl enable cam
