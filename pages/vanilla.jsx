import { useState, useMemo } from "react";
import { ThirdwebSDK } from '@3rdweb/sdk';
import { useWeb3 } from '@3rdweb/hooks';


const Test = () => {
    const [ image, setImage ] = useState(null);
    const { provider } = useWeb3();

    // Web3
    const sdk = useMemo(
          () =>
              provider
                  ? new ThirdwebSDK(provider.getSigner())
                  : new ThirdwebSDK(),
          [provider]
      );

    // NFT module.
    const nftMod = sdk.getNFTModule("0xD91A8C3Dd5fa4F829A009FCd9C1DDc8417DB78f9");

    const formSubmit = ev => {
        ev.preventDefault();

        // Ensure image is not empty
        if (image) {
            (async () => {
                console.log(
                    await nftMod.mint({
                        name: "Thirdweb NFT.",
                        description: "NFT minted using thirdweb!",
                        image: image,
                        properties: {}
                    })
                );
            })();
        }
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/png, image/jpeg" 
                    onChange={ev => setImage(ev.target.files[0])}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Test;
