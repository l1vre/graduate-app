import { IsNotEmpty } from "class-validator";

export class ToggleGroupDto {
	@IsNotEmpty()
	group_code: number;

	hours?: number
}