import React from 'react';
import { allColors } from '../utils/colors';
import { DNA } from '../../../models/TypeAliases';
import { PetAttributes } from '../../../models/models';

export const PetComponent = (props: { dna: DNA }) => {
	const attributes = PetAttributes.create(props.dna, allColors());

	return (
		<div className="dog">
			<div className="head-container">
				<div className="ears">
					<div className="ear left_ear" style={{ background: attributes.colorOfBodyParts().headChestColor }}>
						<div
							className="ear left_inner_ear"
							style={{ background: attributes.colorOfBodyParts().earPawColor }}
						/>
					</div>
					<div
						className="ear left_ear_end"
						style={{ background: attributes.colorOfBodyParts().headChestColor }}
					/>
					<div className="ear right_ear" style={{ background: attributes.colorOfBodyParts().headChestColor }}>
						<div
							className="ear right_inner_ear"
							style={{ background: attributes.colorOfBodyParts().earPawColor }}
						/>
					</div>
					<div
						className="ear right_ear_end"
						style={{ background: attributes.colorOfBodyParts().headChestColor }}
					/>
				</div>
				<div className="head" style={{ background: attributes.colorOfBodyParts().headChestColor }}>
					<div id="midDot" className="dog__head-dots" style={attributes.decoration().middleStyle}>
						<div
							id="leftDot"
							className="dog__head-dots_first"
							style={{ background: attributes.colorOfBodyParts().decorationSideColor }}
						/>
						<div
							id="rightDot"
							className="dog__head-dots_second"
							style={{ background: attributes.colorOfBodyParts().decorationSideColor }}
						/>
					</div>
					<div className="eyes">
						<div className="eye_shade">
							<div className="eye" style={{ background: attributes.colorOfBodyParts().headChestColor }}>
								<div className="left_inner_eye">
									<div
										className="left_outer_pupil"
										style={{ background: attributes.colorOfBodyParts().eyeColor }}
									>
										<div className="pupils">
											<div className="left_inner_pupil" />
											<div className="left_inner_pupil_2" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="eye_shade">
							<div className="eye" style={{ background: attributes.colorOfBodyParts().headChestColor }}>
								<div className="right_inner_eye">
									<div
										className="right_outer_pupil"
										style={{ background: attributes.colorOfBodyParts().eyeColor }}
									>
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
				<div className="cheeks" style={{ background: attributes.colorOfBodyParts().headChestColor }} />
				<div className="chin" style={{ background: attributes.colorOfBodyParts().headChestColor }} />
				<div className="mouth" style={{ background: attributes.colorOfBodyParts().mouthBodyTailColor }} />
				<div className="mouth_2" style={{ background: attributes.colorOfBodyParts().mouthBodyTailColor }} />
				<div className="mouth_3" />
				<div className="tongue_1" />
				<div className="tongue_2" />
				<div className="tongue_3" />
				<div className="tongue_4" />
				<div className="tongue_5" />
				<div className="left_cheek" style={{ background: attributes.colorOfBodyParts().mouthBodyTailColor }} />
				<div className="right_cheek" style={{ background: attributes.colorOfBodyParts().mouthBodyTailColor }} />
				<div className="nose" />
			</div>
			<div className="body-container">
				<div className="neck" style={{ background: attributes.colorOfBodyParts().headChestColor }} />
				<div className="body" style={{ background: attributes.colorOfBodyParts().headChestColor }}>
					<div className="belly" style={{ background: attributes.colorOfBodyParts().mouthBodyTailColor }} />
				</div>
				<div className="left_foot" style={{ background: attributes.colorOfBodyParts().earPawColor }} />
				<div className="right_foot" style={{ background: attributes.colorOfBodyParts().earPawColor }} />
				<div className="back_left_foot" style={{ background: attributes.colorOfBodyParts().earPawColor }} />
				<div className="back_right_foot" style={{ background: attributes.colorOfBodyParts().earPawColor }} />
				<div className="left_leg" style={{ background: attributes.colorOfBodyParts().headChestColor }} />
				<div className="right_leg" style={{ background: attributes.colorOfBodyParts().headChestColor }} />
				<div className="dog__tail" style={attributes.tailStyle()} />
			</div>
		</div>
	);
};
