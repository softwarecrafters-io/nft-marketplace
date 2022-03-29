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

export const DogComponent = (props: { dna: DNA }) => {
	const cat = CatAttributes.create(props.dna, allColors());

	return (
		<div className="dog">
			<div className="head-container">
				<div className="ears">
					<div className="ear left_ear">
						<div className="ear left_inner_ear" />
					</div>
					<div className="ear left_ear_end" />
					<div className="ear right_ear">
						<div className="ear right_inner_ear" />
					</div>
					<div className="ear right_ear_end" />
				</div>
				<div className="head">
					<div id="midDot" className="dog__head-dots" style={cat.decoration().middleStyle}>
						<div
							id="leftDot"
							className="dog__head-dots_first"
							style={{ background: cat.colorOfBodyParts().decorationSideColor }}
						/>
						<div
							id="rightDot"
							className="dog__head-dots_second"
							style={{ background: cat.colorOfBodyParts().decorationSideColor }}
						/>
					</div>
					<div className="eyes">
						<div className="eye_shade">
							<div className="eye">
								<div className="left_inner_eye">
									<div className="left_outer_pupil">
										<div className="pupils">
											<div className="left_inner_pupil" />
											<div className="left_inner_pupil_2" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="eye_shade">
							<div className="eye">
								<div className="right_inner_eye">
									<div className="right_outer_pupil">
										<div className="pupils">
											<div className="right_inner_pupil" />
											<div className="right_inner_pupil_2" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="cheeks" />
				<div className="chin" />
				<div className="mouth" />
				<div className="mouth_2" />
				<div className="mouth_3" />
				<div className="tongue_1" />
				<div className="tongue_2" />
				<div className="tongue_3" />
				<div className="tongue_4" />
				<div className="tongue_5" />
				<div className="left_cheek" />
				<div className="right_cheek" />
				<div className="nose" />
			</div>
			<div className="body-container">
				<div className="neck" />
				<div className="body">
					<div className="belly" />
				</div>
				<div className="left_foot" />
				<div className="right_foot" />
				<div className="back_left_foot" />
				<div className="back_right_foot" />
				<div className="left_leg" />
				<div className="right_leg" />
				<div
					className="dog__tail"
					style={
						{
							/*cat.tailStyle()*/
						}
					}
				/>
			</div>
		</div>
	);
};
