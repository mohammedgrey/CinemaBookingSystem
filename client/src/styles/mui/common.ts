import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
const useCommonStyles = makeStyles((theme: any) =>
  createStyles({
    centerFlex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerAbsolute: {
      display: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
    centeredRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerHorizontally: {
      margin: '0px auto',
    },
    spacedRow: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    spacedRowNoWrap: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    spacedRowCenterV: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    spacedColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // alignItems: "center",
      flexWrap: 'wrap',
      height: '100%',
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    normalPaddingBlock: {
      paddingBlock: theme.spacing(2),
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    reverseWhenArabic: {
      transform: theme.direction === 'ltr' ? 'scaleX(1)' : 'scaleX(-1)',
    },
    commonInlinePadding: {
      paddingInline: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        paddingInline: theme.spacing(2),
      },
    },
    endIcon: {
      marginInlineStart: theme.spacing(1),
    },
    form: {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
    },
    flexEnd: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
    marginInlineEnd: {
      marginInlineEnd: theme.spacing(2),
    },
    formButton: {
      paddingBlock: '10px',
      borderRadius: '28px',
      textTransform: 'none',
      fontWeight: 500,
    },
  })
);

export default useCommonStyles;
