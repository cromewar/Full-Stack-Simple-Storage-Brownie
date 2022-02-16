from scripts.helpful_scripts import get_account
from brownie import SimpleStorage


def deploy_simple_storage():
    account = get_account()
    simple_storage = SimpleStorage.deploy({"from": account})
    print(f"Contract deployed at: {simple_storage.address}")


def main():
    deploy_simple_storage()
