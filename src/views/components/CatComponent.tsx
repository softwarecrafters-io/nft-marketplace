import React from 'react';
import { CssEditor, DNA } from './KittiesFactoryComponent';
import { allColors } from '../../apps/kriptoKitties/colors';

type ColorsRecord = { 10: string };

export class CatAttributes {
	private constructor(private dna: DNA, private colors: ColorsRecord) {}

	static create(genes: DNA, colors: ColorsRecord) {
		return new CatAttributes(genes, colors);
	}

	colorOfBodyParts() {
		return {
			headChestColor: `#${this.colors[this.dna[0] as 10]}`,
			mouthBodyTailColor: `#${this.colors[this.dna[1] as 10]}`,
			eyeColor: `#${this.colors[this.dna[2] as 10]}`,
			earPawColor: `#${this.colors[this.dna[3] as 10]}`,
			decorationMiddleColor: `#${this.colors[this.dna[6] as 10]}`,
			decorationSideColor: `#${this.colors[this.dna[7] as 10]}`,
		};
	}

	eyeShape() {
		const eyeColor = this.colorOfBodyParts().eyeColor;
		const eyeStyle = { background: eyeColor, height: '42px', borderTopWidth: '0px', borderBottomWidth: '0px' };
		const eyeShape = this.dna[4];
		if (eyeShape == 2) {
			return { ...eyeStyle, height: '25px', borderBottomWidth: '15px' };
		}
		if (eyeShape == 3) {
			return { ...eyeStyle, height: '25px', borderTopWidth: '15px' };
		}
		if (eyeShape == 4) {
			return { ...eyeStyle, height: '10px', borderTopWidth: '15px', borderBottomWidth: '15px' };
		}
		return eyeStyle;
	}

	decoration() {
		const decorationPattern = this.dna[5];
		let middleStyle = { background: this.colorOfBodyParts().decorationMiddleColor, transform: 'rotate(0deg)' };
		let sideStyle = { background: this.colorOfBodyParts().decorationSideColor, transform: 'rotate(0deg)' };
		if (decorationPattern == 2) {
			middleStyle = { background: this.colorOfBodyParts().decorationMiddleColor, transform: 'rotate(180deg)' };
			sideStyle = { background: this.colorOfBodyParts().decorationSideColor, transform: 'rotate(180deg)' };
			return { middleStyle, sideStyle };
		}
		if (decorationPattern == 3) {
			middleStyle = {
				background: this.colorOfBodyParts().decorationMiddleColor,
				transform: 'rotate(180deg) translate(0, 40px)',
			};
			sideStyle = {
				background: this.colorOfBodyParts().decorationSideColor,
				transform: 'rotate(180deg) translate(0, 40px)',
			};
			return { middleStyle, sideStyle };
		}
		if (decorationPattern == 4) {
			middleStyle = { background: this.colorOfBodyParts().decorationMiddleColor, transform: 'scale(1.5, 0.5)' };
			sideStyle = { background: this.colorOfBodyParts().decorationSideColor, transform: 'scale(1.5, 0.5)' };
			return { middleStyle, sideStyle };
		}
		if (decorationPattern == 5) {
			middleStyle = {
				background: this.colorOfBodyParts().decorationMiddleColor,
				transform: 'rotate(180deg) scale(1.5, 0.5)',
			};
			sideStyle = {
				background: this.colorOfBodyParts().decorationSideColor,
				transform: 'rotate(180deg) scale(1.5, 0.5)',
			};
			return { middleStyle, sideStyle };
		}
		return { middleStyle, sideStyle };
	}

	headStyle() {
		const style = { background: this.colorOfBodyParts().headChestColor };
		const animation = this.dna[8];
		return animation === 2 ? { ...style, animation: 'moveHead 2s infinite' } : style;
	}

	tailStyle() {
		const style = { background: this.colorOfBodyParts().mouthBodyTailColor };
		const animation = this.dna[8];
		return animation === 3 ? { ...style, animation: 'moveTail 2.5s infinite' } : style;
	}

	rightEarStyle() {
		const style = { background: this.colorOfBodyParts().earPawColor };
		const animation = this.dna[8];
		if (animation === 4) {
			return { ...style, animation: 'earRight 3s infinite' };
		}
		if (animation === 5) {
			return { ...style, animation: 'earUpRight 3s infinite' };
		}
		return style;
	}

	leftEarStyle() {
		const style = { background: this.colorOfBodyParts().earPawColor };
		const animation = this.dna[8];
		if (animation === 4) {
			return { ...style, animation: 'earLeft 3s infinite' };
		}
		if (animation === 5) {
			return { ...style, animation: 'earUpLeft 3s infinite' };
		}
		return style;
	}
}

export const CatComponent = (props: { dna: DNA }) => {
	const cat = CatAttributes.create(props.dna, allColors());

	return (
		<div className="cat">
			<div className="cat__ear">
				<div id="leftEar" className="cat__ear--left" style={cat.leftEarStyle()}>
					<div className="cat__ear--left-inside" />
				</div>
				<div id="rightEar" className="cat__ear--right" style={cat.rightEarStyle()}>
					<div className="cat__ear--right-inside" />
				</div>
			</div>
			<div id="head" className="cat__head" style={cat.headStyle()}>
				<div id="midDot" className="cat__head-dots" style={cat.decoration().middleStyle}>
					<div
						id="leftDot"
						className="cat__head-dots_first"
						style={{ background: cat.colorOfBodyParts().decorationSideColor }}
					/>
					<div
						id="rightDot"
						className="cat__head-dots_second"
						style={{ background: cat.colorOfBodyParts().decorationSideColor }}
					/>
				</div>
				<div className="cat__eye">
					<div className="cat__eye--left">
						<span className="pupil-left" style={cat.eyeShape()} />
					</div>
					<div className="cat__eye--right">
						<span className="pupil-right" style={cat.eyeShape()} />
					</div>
				</div>
				<div className="cat__nose" />
				<div className="cat__mouth-contour" style={{ background: cat.colorOfBodyParts().mouthBodyTailColor }} />
				<div className="cat__mouth-left" />
				<div className="cat__mouth-right" />
				<div className="cat__whiskers-left" />
				<div className="cat__whiskers-right" />
			</div>
			<div className="cat__body">
				<div className="cat__chest" style={{ background: cat.colorOfBodyParts().headChestColor }} />
				<div className="cat__chest_inner" style={{ background: cat.colorOfBodyParts().mouthBodyTailColor }} />
				<div className="cat__paw-left" style={{ background: cat.colorOfBodyParts().earPawColor }} />
				<div className="cat__paw-left_inner" style={{ background: cat.colorOfBodyParts().earPawColor }} />
				<div className="cat__paw-right" style={{ background: cat.colorOfBodyParts().earPawColor }} />
				<div className="cat__paw-right_inner" style={{ background: cat.colorOfBodyParts().earPawColor }} />
				<div id="tail" className="cat__tail" style={cat.tailStyle()} />
			</div>
		</div>
	);
};
