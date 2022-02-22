from scripts.helpful_scripts import get_account
from brownie import SimpleStorage


import os
import json
import yaml
import shutil


def deploy_simple_storage(update_front_end=False):
    account = get_account()
    simple_storage = SimpleStorage.deploy({"from": account})
    print(f"Contract deployed at: {simple_storage.address}")

    if update_front_end:
        update_frontend()


def update_frontend():
    # Send the build folder to front-end
    copy_folders_to_front_end("./build", "./front-end/pages/chain-info")
    # Send Brownie-config.yaml
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front-end/pages/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)


def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_simple_storage(update_front_end=True)
