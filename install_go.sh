#!/bin/bash

GO_VERSION=$GO_VERSION
wget https://golang.org/dl/go1.19.7.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.19.7.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
