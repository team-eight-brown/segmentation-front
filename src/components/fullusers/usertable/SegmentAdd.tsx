import {Box, Button, Stack, TextField, Typography} from "@mui/material";

const SegmentAdd = ({segmentAddValue, handleSegmentAddValue, handleAddSegment, isProcessAdd, userId}) => {
    return (
        <Stack
            direction="row"
            spacing={3}
            margin={2}
        >
            <Box margin={2} sx={{
                display: 'flex',
                bgcolor: 'background.paper',
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: 3,
                p: 1,
                width: 400

            }}>
                <TextField
                    id="newSegment"
                    label="ID сегмента"
                    name="newSegment"
                    variant="outlined"
                    color="primary"
                    value={segmentAddValue}
                    onChange={handleSegmentAddValue}
                />
                <Button
                    disabled={isProcessAdd}
                    onClick={handleAddSegment}
                >
                    Добавить сегмент
                </Button>

            </Box>
        </Stack>
    )
}

export default SegmentAdd