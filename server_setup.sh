#!/bin/bash
# update apt
yes | sudo apt update && sudo apt upgrade
yes | sudo apt install software-properties-common -y
# INSTALL PYTHON
sudo apt install wget build-essential libncursesw5-dev libssl-dev \
libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
yes | sudo add-apt-repository ppa:deadsnakes/ppa
yes | sudo apt install python3.11
echo alias py=python3.11 >> ~/.bashrc
echo alias python=python3.11 >> ~/.bashrc
echo alias python3=python3.11 >> ~/.bashrc
yes | sudo apt install python3.11-venv
python3.11 -m ensurepip
echo alias pip=pip3 >> ~/.bashrc
yes | python3.11 -m pip install --upgrade pip
# remove previos python version if needed
# check installed packages
# apt list --installed
# sudo apt-get remove python3.5
# remove python with dependencies and data files
# sudo apt-get purge --auto-remove python3.5

# UPDATE LOCALE TO UTF-8
sudo apt-get install -y locales
sudo locale-gen en_US.UTF-8
echo export LC_ALL=en_US.UTF-8 >> ~/.bashrc
echo export LANG=en_US.UTF-8 >> ~/.bashrc


# run ~/.bashrc to apply aliases
exec bash
source ~/.bashrc
exec zsh
