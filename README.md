# Thermal cam

This is software for the Raspberry PI for accessing a Groove Studio [Thermal Imaging Camera IR-Array MLX90640](https://wiki.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array/).

# Installation

First, install a Raspberry PI OS. I chose a 'lite' version without desktop environment because I didn't have a monitor and keyboard connected to the Raspberry PI.

Therefore, after booting and logging in via SSH, I needed to add some required packages:

```bash
sudo apt update
sudo apt install git python3-pip
```

After that, I've installed the repository from source and installed the required libraries:

```bash
git clone https://github.com/jschirrmacher/thermal-cam.git cam
cd cam
pip3 install -r requirements.txt
```

I've set up a Wifi repeater on the Pi, so that it is possible to use the smart phone to use the Pi/Cam in the wild, but also be able to access the internet, when being at home. Therefore I've used [this Stackoverflow answer](https://raspberrypi.stackexchange.com/questions/89803/access-point-as-wifi-router-repeater-optional-with-bridge#:~:text=service%20is%20active.-,Example%20for%20this%20setup,-%3A)
