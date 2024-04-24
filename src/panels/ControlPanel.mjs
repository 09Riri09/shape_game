export class ControlPanel {
    constructor(x, y, descriptionText, physicsManager, type) {

        this.physicsManager = physicsManager;

        const container = document.createElement('div');

        this.incrementButton = this.createHtmlButton(x, y, '+');
        this.decrementButton = this.createHtmlButton(x + 50, y, '-');

        const buttonGroup = document.createElement('div');
        buttonGroup.style.display = 'flex';
        buttonGroup.style.justifyContent = 'space-between';
        buttonGroup.style.width = '100px';
        buttonGroup.style.margin = '0 20px';
        buttonGroup.appendChild(this.incrementButton);
        buttonGroup.appendChild(this.decrementButton);

        this.resultText = this.createResultText(x, y + 55, descriptionText);

        container.appendChild(buttonGroup);
        container.appendChild(this.resultText);

        this.incrementButton.onclick = () => {
            if (type === 'gravity') {
                this.physicsManager.increaseGravity();
                this.resultText.innerText = `${descriptionText} \
                ${this.physicsManager.getGravityValue()}`;
            } else {
                this.physicsManager.increaseNumberOfShapesPerSec();
                this.resultText.innerText = `${descriptionText} \
                ${this.physicsManager.getNumberOfShapesPerSec()}`;
            }
        }
        this.decrementButton.onclick = () => {
            if (type === 'gravity') {
                this.physicsManager.decreaseGravity();
                this.resultText.innerText = `${descriptionText} \
                ${this.physicsManager.getGravityValue()}`;

            } else {
                this.physicsManager.decreaseNumberOfShapesPerSec();
                this.resultText.innerText = `${descriptionText} \
                ${this.physicsManager.getNumberOfShapesPerSec()}`;
            }
        }

        document.body.appendChild(container);
    }


    createHtmlButton(x, y, innerText) {
        const button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.style.fontSize = '30px';
        button.style.height = '50px';
        button.style.backgroundColor = 'cyan';
        button.innerText = innerText;
        button.style.width = '50px';
        return button;
    }
    
    createResultText(x, y, descriptionText) {
        const resultText = document.createElement('div');
        resultText.style.position = 'absolute';
        resultText.style.left = `${x}px`;
        resultText.style.top = `${y}px`;
        resultText.style.fontSize = '30px';
        resultText.style.fontFamily = 'Arial';
        resultText.style.color = 'black';
        resultText.innerText = `${descriptionText} 1`;
        return resultText;
    }
}
