#!/bin/bash
# update apt
sudo apt update && sudo apt upgrade
# install 
sudo apt install wget build-essential libncursesw5-dev libssl-dev \
libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt install python3.11
echo alias py=python3.11 >> ~/.bashrc
echo alias python=python3.11 >> ~/.bashrc
# then run ~/.bashrc or restart session
