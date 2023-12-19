# Thermal cam

This is software for the Raspberry PI for accessing a Groove Studio [Thermal Imaging Camera IR-Array MLX90640](https://wiki.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array/).

# Installation

First, install a Raspberry PI OS. I chose a 'lite' version without desktop environment because I didn't have a monitor and keyboard connected to the Raspberry PI.

Therefore, after booting and logging in via SSH, I needed to add some required packages:

```bash
sudo apt get update
sudo apt get install git python3-pip
```

After that, I've installed the repository from source and installed the required libraries:

```bash
git clone https://github.com/jschirrmacher/thermal-cam.git cam
cd cam
pip3 install -r requirements.txt
```
